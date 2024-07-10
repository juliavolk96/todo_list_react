import React, { useState, useCallback } from 'react';
import './css/normalize.css';
import './css/style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { Task } from './components/types';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage', error);
      return [];
    }
  });

  const addTask = useCallback((text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  const updateTask = useCallback((id: number, text: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  const toggleTask = useCallback((id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

  const removeTask = useCallback((id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }, [tasks]);

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