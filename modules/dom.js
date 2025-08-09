// dom.js
import { getTodos, deleteTodo, updateTodo } from './todos.js';

// === DOM Selectors ===
const listElement = document.getElementById('todo-list');

// === Public Render Function ===
export function renderTodos() {
  clearTodoList();
  const todos = getTodos();
  // console.log('TODOS: ', todos)   // debugging: log todos to console

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
    span.classList.add('todo-item-completed');
  } else {
    span.classList.remove('completed');
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
  editBtn.textContent = '✍️ Edit';
  editBtn.classList.add('btn', 'edit-btn');
  editBtn.onclick = () => handleEdit(id, span);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️ Delete';
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
  const li = span.closest('li');

  // Hide action buttons
  const hideActionButtons = li.querySelector('.actions');
  if (hideActionButtons) {
    hideActionButtons.style.display = 'none';
  }

  // create editable input
  const input = document.createElement('input');
  input.value = span.textContent;
  input.classList.add('edit-input');

  // save button
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾 Save';
  saveBtn.classList.add('btn', 'save-btn');

  // cancel button
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '❌ Cancel';
  cancelBtn.classList.add('btn', 'cancel-btn');

  // button wrapper
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('edit-button-group');
  buttonGroup.append(saveBtn, cancelBtn);

  // save button logic
  saveBtn.onclick = () => {
    const newText = input.value.trim();
    if (newText !== '') {
      updateTodo(id, newText); // keep checkbox state unchanged
      renderTodos();
    }
  };

  // cancel button logic
  cancelBtn.onclick = () => {
    renderTodos();  //go back to original
  }

  const todoLeft = li.querySelector('.todo-left');
  todoLeft.innerHTML = '';
  // todoLeft.append(input, saveBtn, cancelBtn)
  todoLeft.append(input, buttonGroup)
  
  // li.innerHTML = '';
  // li.append(input, saveBtn);
}
