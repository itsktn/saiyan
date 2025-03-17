import { z } from "zod";

// Schema for a single task
export const TaskSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
});

// Schema for the array of tasks
export const TaskArraySchema = z.array(TaskSchema);

// Schema for the API response
export const ApiResponseSchema = z.object({
  tasks: z.array(z.string()),
});

// Schema for raw tasks from Claude (array of strings)
export const RawTasksSchema = z.array(z.string()).length(3);

// Derive TypeScript types from schemas
export type Task = z.infer<typeof TaskSchema>;
export type TaskArray = z.infer<typeof TaskArraySchema>;
export type ApiResponse = z.infer<typeof ApiResponseSchema>;
export type RawTasks = z.infer<typeof RawTasksSchema>;
