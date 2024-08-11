const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTodo = document.querySelector('.todo-input') as HTMLInputElement;
const formTodo = document.querySelector('.todo-form') as HTMLFormElement;
const todoList = document.querySelector('.todo-list') as HTMLLIElement;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;


// handlesubmit
const handleSubmit = (e: Event) => {
    e.preventDefault();
    const newTodo: Todo ={
        id: Date.now(),
        todo: inputTodo.value,
        completed: false
    }
    // TODO save to local storage
    todos.push(newTodo)

    // save to local storage
    saveTodos();
    // Append new todo Fn
    appendTodo(newTodo)


    // reset Input
    inputTodo.value = '';


};
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// new todo intecface

interface Todo {
    id: number,
    todo: string,
    completed: boolean
}

// new todos array
const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
console.log(todos);

// Append new todos to the DOM on start

window.addEventListener('DOMContentLoaded', () => {
    todos.forEach(todo => appendTodo(todo));
});

// Append function new todo
const appendTodo = (newTodo: Todo) => {
    const newLi = document.createElement('li');
    const checkB = document.createElement('input');
    checkB.type = 'checkbox';
    checkB.checked = newTodo.completed;
    checkB.addEventListener('change', () => {
        console.log('checked');
        newTodo.completed = checkB.checked;
        saveTodos();
    });
    newLi.append(newTodo.todo, checkB);
    todoList.prepend(newLi);
}

formTodo.addEventListener('submit', e => handleSubmit(e));{
    console.log("submit");
}

// delete all todos
const clearTodos = () => {
    todos.length = 0;
    saveTodos();
    todoList.innerHTML = '';
};

btnDeleteAll.addEventListener('click', clearTodos);{
    console.log("delete all");
}
