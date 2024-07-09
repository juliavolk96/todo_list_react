import React from 'react';
import TodoList from './TodoList';
import { Task } from './types';

/**
 * Renders the main content of the application.
 * @function
 * @param {MainProps} props - Props for the Main component.
 */

interface MainProps {
  tasks: Task[];
  addTask: (text: string) => void;
  updateTask: (id: number, text: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const Main: React.FC<MainProps> = ({ tasks, addTask, updateTask, toggleTask, removeTask }) => {
  return (
    <main className="main">
      <TodoList
        tasks={tasks}
        addTask={addTask}
        updateTask={updateTask}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </main>
  );
};

export default Main;