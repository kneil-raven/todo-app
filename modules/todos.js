import { saveToStorage, loadFromStorage } from './storage.js';

let todos = loadFromStorage();

// adds new todo to the list
export function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text
    };
    todos.push(newTodo);
    saveToStorage(todos);
}

// retrieve the current list of todos
export function getTodo() {
    return todos;
}

// update a todo's text
export function updateTodo(id, newText) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    );
    saveToStorage(todos);
}

// delete a todo by ID
export function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToStorage(todos);
}