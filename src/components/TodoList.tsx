import React, { useState } from 'react';
import Form from './Form';
import { Task } from './types';
import pencilIcon from '../images/pencil.png';
import trashbinIcon from '../images/trashbin.png';

/**
 * Renders a to-do list.
 * @function
 * @param {TodoListProps} props - Props for the TodoList component.
 */

interface TodoListProps {
  tasks: Task[];
  addTask: (text: string) => void;
  updateTask: (id: number, text: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, addTask, updateTask, toggleTask, removeTask }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  /**
   * Starts editing a task.
   * @param {Task} task - The task to edit.
   */

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  };

  /**
   * Handles input change during editing.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  };

  /**
   * Saves the edited task.
   * @param {number} taskId - The ID of the task being edited.
   */

  const saveEdit = (taskId: number) => {
    if (isSaving) return;
    setIsSaving(true);
    updateTask(taskId, editingText);
    setEditingTaskId(null);
    setIsSaving(false);
  };

  /**
   * Handles key down events during editing.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The key down event.
   * @param {number} taskId - The ID of the task being edited.
   */

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, taskId: number) => {
    if (e.key === 'Enter') {
      saveEdit(taskId);
    }
  };

  /**
   * Handles blur event during editing.
   * @param {number} taskId - The ID of the task being edited.
   */
  
  const handleBlur = (taskId: number) => {
    saveEdit(taskId);
  };

  return (
    <section className="todo">
      <h2 className="hidden">To-Do List</h2>
      <div className="todo__header">
        <Form addTask={addTask} />
        <div className="todo__content">
          <ul className="todo__list">
            {tasks.map(task => (
              <li key={task.id} className={`todo__item ${task.completed ? 'todo__item--completed' : ''}`}>
                <div className="todo__text-container">
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={handleEditChange}
                      onKeyDown={(e) => handleKeyDown(e, task.id)}
                      onBlur={() => handleBlur(task.id)}
                      className="todo__input--edit"
                      autoFocus
                    />
                  ) : (
                    <span className="task-text" onClick={() => toggleTask(task.id)}>{task.text}</span>
                  )}
                </div>
                <div className="todo__button-container">
                  <button className="todo__button--edit" onClick={() => startEditing(task)}>
                    <img src={pencilIcon} alt="Edit" width="20" height="20" className="todo__icon--edit" />
                  </button>
                  <button className="todo__button--delete" onClick={() => removeTask(task.id)}>
                    <img src={trashbinIcon} alt="Delete" width="20" height="20" className="todo__icon--delete" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
