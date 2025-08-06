# Simple TODO App — Summary & Guide ✅📒

**Modular Architecture | CRUD | localStorage | Pure JS**

## 🔧 Step-by-Step Development Guide

### Step 1: index.html (UI Skeleton)

- Create your input form and a container to display the TODOs.
- ✅ **Key Point:** Use `type="module"` so JS modules can be imported.

### Step 2: storage.js (LocalStorage Abstraction)

- Handles saving and loading from the browser’s storage.
- ✅ **Key Point:** Store everything as JSON. Always parse on load

### Step 3: todos.js (CRUD Logic)

- Contains core operations for the TODO list.
- ✅ **Key Point:** Keep the state (todos) in memory and sync with storage.
- ✅ Study CRUD, reorganize functions using best practices.
- How to add, get, update, delete the Todos

### Step 4: dom.js (UI Rendering & Events)

- Builds and updates the DOM from the TODO state.
- ✅ **Key Point:** Fully rebuild the UI on every update using `renderTodos().`
- Use the core logic functions from the `todos.js` module

### Step 5: Customizing CSS

- ❌ create style for the edit, delete button
- ❌ the new task in new line instead of inline with the task input
- to add styling to the list items, create class named `todo-item` in the `createTodo()` function.
  ```
    function createTodoItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');  //add this line of code
        ...
    }
  ```

- CONTINUE WORKING WITH THE TODO-ITEMS SECTION, CLEAN UP FURTHER
- continue to `todo-item:hover`