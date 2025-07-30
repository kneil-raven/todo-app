import { saveToStorage, loadFromStorage } from './storage.js';

let todos = loadFromStorage();

// return current list of todos (R)
export function getTodos() {
    return todos;
}

// create a new todo (C)
export function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text
    }
    todos.push(newTodo);    //update memory
    saveToStorage(todos);   //save to LocalStorage
}

// delete an existing todo (D)
export function deleteTodo(id) {
    todos = todos.filter(todo => todo.id  !== id);
    saveToStorage(todos);
}

// update an existing todo (U)
export function updateTodo(id, newText) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, text: newText } : todo
    );
    saveToStorage(todos);
}