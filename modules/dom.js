import { getTodos, deleteTodo, updateTodo } from './todos.js';

export function renderTodos() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    const todos = getTodos();

    todos.forEach( (todo) => {
        const li = document.createElement('li');

        // holds the text of the todo item
        const span = document.createElement('span');
        span.textContent = todo.text;

        // to contain the edit and delete button
        const actions = document.createElement('div');
        actions.className = 'actions';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => handleEdit(todo.id, span);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            deleteTodo(todo.id);
            renderTodos();
        }

        actions.append(editBtn, deleteBtn);
        li.append(span, actions);
        list.appendChild(li);

    });
}

// function to replace the text with an input field
function handleEdit(id, span) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';

    saveBtn.onclick = () => {
        updateTodo(id, input.value);
        renderTodos();
    }

    const li = span.parentElement;
    li.innerHTML = '';
    li.append(input, saveBtn);
}