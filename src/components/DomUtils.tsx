import React from "react";

/**
 * Utility component for managing tasks in the DOM.
 * @function
 * @param {DomUtilsProps} props - Props for the DomUtils component.
 */

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface DomUtilsProps {
  template: HTMLTemplateElement;
  list: HTMLElement;
  todoList: {
    getTask: (params: { id: number }) => Task | undefined;
    toggleTask: (task: Task) => void;
    removeTask: (task: Task) => void;
    saveTasksToLocalStorage: () => void;
    getTasks: () => Task[];
  };
}

const DomUtils: React.FC<DomUtilsProps> = ({ template, list, todoList }) => {
  let isSaving = false;

  /**
   * Creates an input element for editing a task.
   * @param {HTMLElement} taskText - The task text element.
   * @param {Function} saveChanges - Callback to save changes.
   * @returns {HTMLInputElement} The input element.
   */

  const createEditInput = (taskText: HTMLElement, saveChanges: () => void) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = taskText.textContent || "";
    input.classList.add("todo__input--edit", "task-text");
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (!isSaving) {
          isSaving = true;
          saveChanges();
          isSaving = false;
        }
      }
    });

    input.addEventListener("blur", saveChanges);

    const focusInput = () => {
      input.focus();
    };
    requestAnimationFrame(focusInput);

    return input;
  };

  /**
   * Saves changes to a task.
   * @param {HTMLInputElement} input - The input element.
   * @param {HTMLElement} taskText - The task text element.
   * @param {HTMLElement} todoItem - The task container element.
   * @param {Task} task - The task object.
   */

  const saveTaskChanges = (
    input: HTMLInputElement,
    taskText: HTMLElement,
    todoItem: HTMLElement,
    task: Task
  ) => {
    try {
      const newText = input.value;
      if (task) {
        task.text = newText;
        todoList.saveTasksToLocalStorage();
        taskText.textContent = newText;
      }
      todoItem.replaceChild(taskText, input);
    } catch (error) {
      console.error("Error while saving task changes:", error);
    }
  };

  /**
   * Updates task styles based on completion status.
   * @param {HTMLElement} todoItem - The task container element.
   * @param {boolean} completed - Indicates whether the task is completed.
   */

  const updateTaskStyles = (todoItem: HTMLElement, completed: boolean) => {
    if (completed) {
      todoItem.classList.add("todo__item--completed");
    } else {
      todoItem.classList.remove("todo__item--completed");
    }
  };

  return null;
};

export default DomUtils;