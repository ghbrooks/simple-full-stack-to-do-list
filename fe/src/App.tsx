import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import {
  Button,
  Paper,
  TextField,
  ListItem,
  List,
  Checkbox,
} from "@mui/material";

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

// axios port
axios.defaults.baseURL = "http://localhost:3001";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] = useState<string>("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (): Promise<void> => {
    try {
      const response = await axios.get<Task[]>("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (): Promise<void> => {
    try {
      const response = await axios.post<Task>("/tasks", {
        title: newTaskTitle,
        description: newTaskDescription,
      });
      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const editTask = async (
    id: number,
    title: string,
    description?: string
  ): Promise<void> => {
    try {
      const response = await axios.put<Task>(`/tasks/${id}`, {
        title,
        description,
      });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleTaskCompletion = async (id: number): Promise<void> => {
    try {
      const task = tasks.find((task) => task.id === id);
      if (task) {
        const response = await axios.put<Task>(`/tasks/${id}`, {
          ...task,
          completed: !task.completed,
        });
        setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
      }
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTaskTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTaskDescription(e.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url('./images/basket.jpg')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          minWidth: "800px",
          width: "50vw",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <h1>Task List</h1>
        <div style={{ marginBottom: "1rem" }}>
          <TextField
            label="Task Title"
            variant="outlined"
            value={newTaskTitle}
            onChange={handleTitleChange}
            sx={{ marginRight: "1rem" }}
          />
          <TextField
            label="Task Description"
            variant="outlined"
            value={newTaskDescription}
            onChange={handleDescriptionChange}
            sx={{ marginRight: "1rem" }}
          />
          <Button variant="contained" color="primary" onClick={addTask}>
            Add Task
          </Button>
        </div>
        <List>
          {tasks.map((task) => (
            <ListItem
              key={task.id}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <TextField
                variant="outlined"
                value={task.title}
                onChange={(e) =>
                  editTask(task.id, e.target.value, task.description)
                }
                sx={{ marginRight: "1rem", flexGrow: 1 }}
              />
              <TextField
                variant="outlined"
                value={task.description || ""}
                onChange={(e) => editTask(task.id, task.title, e.target.value)}
                sx={{ marginRight: "1rem", flexGrow: 2 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default App;
