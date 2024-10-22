import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import pino from "express-pino-logger";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(pino());

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

const tasks: Task[] = [];

// Fetch all tasks
app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// Create a new task
app.post("/tasks", (req: any, res: any) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update an existing task by its ID
app.put("/tasks/:id", (req: any, res: any) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
});

// Delete a task by its ID
app.delete("/tasks/:id", (req: any, res: any) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
