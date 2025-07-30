const STORAGE_KEY = 'modular_todos';

export function saveToStorage(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));   //convert to string -- localStorage only stores strings
}

export function loadFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}
