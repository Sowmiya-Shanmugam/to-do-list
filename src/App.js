import React, { useState, useEffect } from "react";
import "./App.css";
import Spaceship from "./spaceship";

function App() {

  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("spaceTasks")) || [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);


  useEffect(() => {
    localStorage.setItem("spaceTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    if (editingIndex !== null) {
      // update existing task
      const updated = tasks.map((t, i) =>
        i === editingIndex ? { ...t, text: newTask } : t
      );
      setTasks(updated);
      setEditingIndex(null);
    } else {
      // add new task
      const taskObj = {
        id: Date.now(),
        text: newTask,
        done: false, 
      };
      setTasks([...tasks, taskObj]);
    }
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app-container">
      <Spaceship tasks={tasks} />

      <div className="todo-container">
        <h1>🚀 Space To-Do Mission</h1>
        <div className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add or edit a mission task..."
          />
          <button onClick={handleAddTask}>
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul className="tasks">
          {tasks.map((task, i) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "completed" : ""}>
                {task.text}
              </span>
              <button onClick={() => editTask(i)}>✏</button>
              <button onClick={() => deleteTask(task.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

