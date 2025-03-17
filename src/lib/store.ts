import { create } from "zustand";
import { Task, TaskSchema, TaskArraySchema } from "./types";

type ChecklistState = {
  tasks: Task[];
  toggleTaskCompletion: (id: string) => void;
  setTasks: (tasks: string[]) => void;
  loadFromLocalStorage: () => void;
  saveToLocalStorage: () => void;
};

// Helper to get today's date as a string in format YYYY-MM-DD
const getTodayDateString = () => {
  return new Date().toISOString().split("T")[0];
};

// Get the storage key for today
const getStorageKey = () => `checklist-storage-${getTodayDateString()}`;

export const useChecklistStore = create<ChecklistState>((set, get) => ({
  tasks: [],

  toggleTaskCompletion: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    }));
    // Save to local storage after toggling
    get().saveToLocalStorage();
  },

  setTasks: (taskTexts) => {
    const newTasks = taskTexts.map((text) => ({
      id: text, // Use the text as the ID for simplicity
      text,
      completed: false,
    }));

    // Validate the new tasks before setting them
    try {
      TaskArraySchema.parse(newTasks);
      set({ tasks: newTasks });
      // Save to local storage after setting new tasks
      get().saveToLocalStorage();
    } catch (error) {
      console.error("Invalid task data:", error);
      // Keep the existing tasks if validation fails
    }
  },

  // Load tasks from local storage for the current day
  loadFromLocalStorage: () => {
    if (typeof window === "undefined") return; // Skip on server-side

    const key = getStorageKey();
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        // Validate the parsed data against our schema
        const validatedTasks = TaskArraySchema.parse(parsedValue);
        set({ tasks: validatedTasks });
      } catch (error) {
        console.error("Error loading from localStorage:", error);
        // Invalid data in localStorage, start with empty tasks
        set({ tasks: [] });
      }
    }
  },

  // Save tasks to local storage for the current day
  saveToLocalStorage: () => {
    if (typeof window === "undefined") return; // Skip on server-side

    const key = getStorageKey();
    const tasks = get().tasks;

    // Validate before saving
    try {
      TaskArraySchema.parse(tasks);
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (error) {
      console.error("Invalid task data, not saving to localStorage:", error);
    }
  },
}));
