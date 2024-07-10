import React, { useState, useCallback } from 'react';
import Form from './Form';
import { Task } from './types';
import pencilIcon from '../images/pencil.png';
import trashbinIcon from '../images/trashbin.png';

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

  const startEditing = useCallback((task: Task) => {
    setEditingTaskId(task.id);
    setEditingText(task.text);
  }, []);

  const handleEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value);
  }, []);

  const saveEdit = useCallback((taskId: number) => {
    if (isSaving) return;
    setIsSaving(true);
    updateTask(taskId, editingText);
    setEditingTaskId(null);
    setIsSaving(false);
  }, [editingText, isSaving, updateTask]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, taskId: number) => {
    if (e.key === 'Enter') {
      saveEdit(taskId);
    }
  }, [saveEdit]);

  const handleBlur = useCallback((taskId: number) => {
    saveEdit(taskId);
  }, [saveEdit]);

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