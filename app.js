import { renderTodos } from './modules/dom.js';
import { addTodo } from './modules/todos.js';


const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');


form.addEventListener('submit', (e) => {
    const text = input.value.trim();
    if (text !== '') {
        addTodo(text);  //add new todo to storage
        input.value = '';
        renderTodos();  //re-render list including the new todo
        
    }
});

window.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});