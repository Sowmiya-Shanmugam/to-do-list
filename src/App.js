import React, { useState, useEffect } from "react";
import "./App.css";
import Spaceship from "./spaceship";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("spaceTasks")) || [];
  });
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [goal, setGoal] = useState(null); // 🎯 user’s target
  const [goalInput, setGoalInput] = useState(""); // for input box

  useEffect(() => {
    localStorage.setItem("spaceTasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    if (editingIndex !== null) {
      const updated = tasks.map((t, i) =>
        i === editingIndex ? { ...t, text: newTask } : t
      );
      setTasks(updated);
      setEditingIndex(null);
    } else {
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
  // Count how many are already completed
  const alreadyCompleted = tasks.filter((t) => t.done).length;

  // If user already reached the goal, block further completion
  if (goal && alreadyCompleted >= goal) {
    alert(`🎯 You have already reached your goal of ${goal} tasks!`);
    return;
  }

  const updated = tasks.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  setTasks(updated);

  const completed = updated.filter((t) => t.done).length;
  if (goal && completed === goal) {
    setShowCongrats(true);
  }
};


  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const restartTasks = () => {
    if (window.confirm("Do you want to start again with fresh tasks? 🚀")) {
      setTasks([]);
      setShowCongrats(false);
      setGoal(null); // reset goal
      localStorage.removeItem("spaceTasks");
    }
  };

  const completedCount = tasks.filter((t) => t.done).length;

  return (
    <div className="app-container">
      <h1>🚀 Space To-Do Mission</h1>
      <Spaceship tasks={tasks} />

      {/* Step 1: Ask user for goal */}
      {!goal && (
        <div className="goal-setup">
          <input
            type="number"
            min="1"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Enter your mission target (e.g., 15)"
          />
          <button
            onClick={() => {
              if (goalInput > 0) {
                setGoal(parseInt(goalInput, 10));
              }
            }}
          >
            Start Mission 🎯
          </button>
        </div>
      )}

      {/* Step 2: Show todo only after goal set */}
      {goal && (
        <div className="todo-container">
          <div className="task-input">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
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

          {/* Congrats popup */}
          {showCongrats && (
            <div className="congrats-popup">
              <div className="ring"></div>
              <h2>🎉 Congrats! You have completed {goal} tasks! 🎉</h2>
              <button onClick={restartTasks}>Restart Mission 🚀</button>
            </div>
          )}

          {/* Progress counter */}
          <p style={{ marginTop: "15px" }}>
            ✅ Completed: {completedCount} / {goal}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

