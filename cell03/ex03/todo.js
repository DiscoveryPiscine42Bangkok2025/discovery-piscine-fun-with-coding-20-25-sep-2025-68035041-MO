document.addEventListener('DOMContentLoaded', () => {

    const listContainer = document.getElementById('ft_list');
    const newTodoButton = document.getElementById('new-todo');

    // Function to set a cookie
    function setCookie(name, value, days) {
        const d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(JSON.stringify(value)) + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const cname = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cname) === 0) {
                const cookieValue = c.substring(cname.length, c.length);
                return JSON.parse(cookieValue);
            }
        }
        return null;
    }

    // Function to save the list to a cookie
    function saveList() {
        const todos = [];
        listContainer.querySelectorAll('.todo-item').forEach(item => {
            todos.push(item.textContent);
        });
        setCookie('todos', todos, 365); // Save for 365 days
    }

    // Function to add a new todo item to the list
    function addTodo(text, save = true) {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.textContent = text;
        
        // Add click event listener to the new item
        todoItem.addEventListener('click', () => {
            if (confirm(`Do you want to remove "${text}"?`)) {
                listContainer.removeChild(todoItem);
                saveList(); // Save the new state of the list
            }
        });

        // Add the new item to the top of the list
        listContainer.prepend(todoItem);
        if (save) {
            saveList(); // Save the new item
        }
    }

    // Event listener for the "New" button
    newTodoButton.addEventListener('click', () => {
        const todoText = prompt("Enter a new TO DO:");
        if (todoText && todoText.trim() !== "") {
            addTodo(todoText);
        }
    });

    // Load todos from cookie when the page loads
    const savedTodos = getCookie('todos');
    if (savedTodos) {
        savedTodos.reverse().forEach(todo => { // Reverse to maintain original order
            addTodo(todo, false); // Don't save after each load
        });
    }

});