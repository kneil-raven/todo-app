import { saveToStorage, loadFromStorage } from './storage.js';

let todos = loadFromStorage();

// adds new todo to the list
export function addTodo(text) {
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false 
    };
    todos.push(newTodo);
    saveToStorage(todos);
}

// retrieve the current list of todos
export function getTodos() {
    return todos;
}

// update a todo's text
export function updateTodo(id, newText, completed = undefined) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo, 
                text: newText ?? todo.text,
                completed: completed !== undefined ? completed : todo.completed
            };
        }
        return todo;
    })
    saveToStorage(todos);
}

// delete a todo by ID
export function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToStorage(todos);
}

// add toggler for completed todo
export function toggleTodo(id) {
    todos = todos.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    saveToStorage(todos);
}