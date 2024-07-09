import React, { useState } from 'react';
import './css/normalize.css';
import './css/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Task } from './components/types';

/**
 * Main application component.
 * @function
 * @returns {JSX.Element} The root element of the application.
 */
const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  /**
   * Adds a new task.
   * @param {string} text - The task text.
   * @returns {void}
   */
  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /**
   * Updates the text of an existing task.
   * @param {number} id - The task ID.
   * @param {string} text - The new task text.
   * @returns {void}
   */
  const updateTask = (id: number, text: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /**
   * Toggles the completion status of a task.
   * @param {number} id - The task ID.
   * @returns {void}
   */
  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  /**
   * Removes a task.
   * @param {number} id - The task ID.
   * @returns {void}
   */
  const removeTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="App">
      <Header />
      <Main
        tasks={tasks}
        addTask={addTask}
        updateTask={updateTask}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
      <Footer />
    </div>
  );
};

export default App;