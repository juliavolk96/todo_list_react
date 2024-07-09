import React, { useState } from 'react';

/**
 * Renders a form for adding new tasks.
 * @function
 * @param {FormProps} props - Props for the Form component.
 */

interface FormProps {
  addTask: (text: string) => void;
}

const Form: React.FC<FormProps> = ({ addTask }) => {
  const [input, setInput] = useState('');

  /**
   * Handles form submission.
   * @param {React.FormEvent} e - The form submission event.
   */
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  return (
    <form className="todo__form" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="todo__label hidden">New task</label>
      <div className="todo__input-group">
        <input
          type="text"
          className="todo__input"
          id="todo-input"
          name="todo-input"
          placeholder="Add your task"
          aria-label="New task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="todo__button" type="submit" aria-label="Add task">
          +
        </button>
      </div>
    </form>
  );
};

export default Form;