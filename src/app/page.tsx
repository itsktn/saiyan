"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useChecklistStore } from "@/lib/store";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { tasks, setTasks, toggleTaskCompletion, loadFromLocalStorage } =
    useChecklistStore();
  const [error, setError] = useState<string | null>(null);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/checklist");

      if (!response.ok) {
        throw new Error("Failed to fetch checklist");
      }

      const data = await response.json();

      if (Array.isArray(data.tasks) && data.tasks.length > 0) {
        setTasks(data.tasks);
      } else {
        setError("No tasks received from API");
      }
    } catch (error) {
      console.error("Error fetching checklist:", error);
      setError("Failed to load your checklist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // First try to load tasks from local storage
    loadFromLocalStorage();

    // If no tasks in local storage, fetch from API
    if (tasks.length === 0) {
      fetchTasks();
    } else {
      setLoading(false);
    }
  }, []);

  // Get today's date to display at the top
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate completion percentage
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionPercentage =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Daily Self-Improvement
            </CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-8">
                <p>{error}</p>
                <button
                  onClick={fetchTasks}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={task.id}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1"
                    />
                    <label
                      htmlFor={task.id}
                      className={`text-lg ${
                        task.completed
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : ""
                      }`}
                    >
                      {task.text}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>

          {!loading && !error && (
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <p className="text-sm text-gray-500">
                {completedTasks} of {tasks.length} tasks completed
              </p>
              <div className="bg-gray-200 dark:bg-gray-700 w-32 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>
    </main>
  );
}
