const form = document.querySelector('form');


class Todo {
    constructor(text, id, isUrgent, isComplete) {
        this.text = text;
        this.id = id;
        this.isUrgent = isUrgent;
        this.isComplete = isComplete;
        this.isDeleted = false;
    }
}

let todoList = [];

document.addEventListener('DOMContentLoaded', () => {
    const todos = localStorage.getItem('todoList');
    if (todos) {
        todoList = JSON.parse(todos);
        todoList.forEach(todo => {
            displayTodo(todo);
        });
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('#input');
    const urgent = document.querySelector('#important');
    const text = input.value;
    const isUrgent = urgent.checked;
    console.log(urgent.checked)
    
    if (text != "") {
        addTodo(text, isUrgent);
        input.value = "";
    }
});

list.addEventListener('click', e => {
    console.log(e.target);
    if (e.target.dataset.button && e.target.dataset.button === 'check') {
        const key = e.target.closest('li').dataset.key;
        console.log(key);
        toggleDone(key);
    }
    if (e.target.dataset.button && e.target.dataset.button === 'trash') {
        const key = e.target.closest('li').dataset.key;
        deleteTodo(key);
    }
});

function addTodo(text, prio) {
    const id = Date.now();
    const todo = new Todo(text, id, prio, false);
    todoList.push(todo);
    displayTodo(todo);
    console.log(todoList);
    
}

function displayTodo(todo) {
    console.log(todoList);
    localStorage.setItem('todoList', JSON.stringify(todoList));
    const list = document.querySelector('#list');
    const item = document.querySelector(`[data-key='${todo.id}']`);
    if (todo && todo.isDeleted) {
        item.remove();
        return;
    }

    const isComplete = todo.isComplete ? ' text-gray-600 line-through' : '';
    const checkBtn = todo.isComplete ? 'fa-times' : 'fa-check';
    const isUrgent = todo.isUrgent ? ' font-bold text-red-600' : '';
    const node = document.createElement('li');
    node.setAttribute('class', 'inline-flex justify-between w-full bg-gray-50 shadow-lg rounded py-2 pl-3 my-3');
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
            <span class="font-semibold ${isComplete} self-center ${isUrgent}">${todo.text} </span>
            <span class="inline-flex pr-3 w-1/5">
                <button class="w-1/2 hover:text-purple-600 transition-colors duration-100 ease-in" type="button" id="trashBtn" value="trash" aria-label="Supprimer la tâche">
                    <i class="fas fa-trash-alt cursor-pointer" data-button="trash" ></i>
                </button>
                <button class="w-1/2 hover:text-purple-600 transition-colors duration-100 ease-in" type="button" id="checkBtn" value="check" aria-label="Tâche terminée">
                    <i class="fas ${checkBtn} fa-lg cursor-pointer" data-button="check" ></i>
                </button> 
            </span>
        `;
    if (item) {
        console.log(item)
        list.replaceChild(node, item);
    } else {
        list.append(node);
    }
}

function toggleDone(key) {
    const index = todoList.findIndex(item => item.id === Number(key));
    todoList[index].isComplete = !todoList[index].isComplete;
    displayTodo(todoList[index]);
}


function deleteTodo(key) {
    const index = todoList.findIndex(item => item.id === Number(key));
    todoList[index].isDeleted = true;
    const todo = todoList[index];
    todoList = todoList.filter(item => item.id != Number(key));
    displayTodo(todo);
}
