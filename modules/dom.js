// dom.js
import { getTodos, deleteTodo, updateTodo } from './todos.js';

// === DOM Selectors ===
const listElement = document.getElementById('todo-list');

// === Public Render Function ===
export function renderTodos() {
  clearTodoList();
  const todos = getTodos();
  console.log('TODOS: ', todos)

  todos.forEach((todo) => {
    const todoItem = createTodoItem(todo);
    listElement.appendChild(todoItem);
  });
}

// === Utility Functions ===

// Clear all todo list elements
function clearTodoList() {
  listElement.innerHTML = '';
}

// Create a single todo <li> element with checkbox, text, and buttons
function createTodoItem(todo) {
  const li = document.createElement('li');
  li.classList.add('todo-item');

  // Left Section (Checkbox + text)
  const leftSection = document.createElement('div');
  leftSection.className = 'todo-left';

  // Create Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed; // default false if undefined
  checkbox.className = 'todo-checkbox';
  checkbox.addEventListener('change', () => {
    updateTodo(todo.id, todo.text, checkbox.checked); // pass current text and new completion status
    renderTodos();
  });

  // Create text span
  const span = document.createElement('span');
  span.textContent = todo.text;
  span.className = 'todo-text';
  if (todo.completed) {
    span.style.textDecoration = 'line-through';
    span.style.opacity = 0.5;
  }

  // append left section
  leftSection.append(checkbox, span)

  // Right Section (edit/delete buttons)
  const actions = createActionButtons(todo.id, span);

  li.append(leftSection, actions);
  return li;
}

// Create "Edit" and "Delete" buttons
function createActionButtons(id, span) {
  const actions = document.createElement('div');
  actions.className = 'actions';    // ==> Right Section (Edit/Delete buttons)

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.onclick = () => handleEdit(id, span);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('btn', 'delete-btn');
  deleteBtn.onclick = () => {
    deleteTodo(id);
    renderTodos();
  };

  actions.append(editBtn, deleteBtn);
  return actions;
}

// Replace span with input + save
function handleEdit(id, span) {
  const input = document.createElement('input');
  input.value = span.textContent;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';

  saveBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText !== '') {
      updateTodo(id, newText); // keep checkbox state unchanged
      renderTodos();
    }
  };

  const li = span.parentElement;
  li.innerHTML = '';
  li.append(input, saveBtn);
}
