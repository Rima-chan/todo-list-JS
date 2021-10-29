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
    const ref = localStorage.getItem('todoList');
    if (ref) {
        todoList = JSON.parse(ref);
        todoList.forEach(todo => {
            displayTodo(todo);
        });
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(e)
    const input = document.querySelector('#input');
    console.log(input.value)
    const text = input.value;
    const isUrgent = document.querySelector('#important').value;
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
    localStorage.setItem('todoList', JSON.stringify(todoList));
    const list = document.querySelector('#list');
    const item = document.querySelector(`[data-key='${todo.id}']`); 
    console.log(item);
    console.log(todo)
    if (todo.isDeleted) {
        item.remove();
        return;
    }

    const isComplete = todo.isComplete ? ' text-gray-600 line-through' : '';
    const checkBtn = todo.isComplete ? 'fa-times' : 'fa-check';
    const node = document.createElement('li');
    node.setAttribute('class', 'inline-flex justify-between w-full bg-gray-50 shadow-lg rounded py-2 pl-3 my-3');
    node.setAttribute('data-key', todo.id);
    node.innerHTML = `
            <span class="font-semibold ${isComplete}">${todo.text} </span>
            <span class="pr-3">
                <button class="cursor-pointer pr-3" type="button" id="trashBtn" value="trash" aria-label="Supprimer la tâche">
                    <i class="fas fa-trash-alt " data-button="trash" ></i>
                </button>
                <button class="cursor-pointer" type="button" id="checkBtn" value="check" aria-label="Tâche terminée">
                    <i class="fas ${checkBtn} fa-lg" data-button="check" ></i>
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
    console.log(index);
    todoList[index].isDeleted = true;
    displayTodo(todoList[index]);
    todoList = todoList.filter(item => item.id != Number(key));
}

// function updateTodo(e) {
    
//     const button = e.target.dataset.button;
//     console.log(button)
//     const li = e.target.closest('li');
//     const id = parseInt(li.getAttribute('id'), 10);
//     const todo = todoList.filter(element => element.id === id);
//     const textId = `text-${id}`;
//     const text = document.querySelector(`[data-text=${textId}]`);
//     console.log(todo)
//     if (button === 'check') {
//         todo[0].isComplete = !todo[0].isComplete;
//         e.target.classList.toggle("fa-check");
//         e.target.classList.toggle("fa-times");
//         text.classList.toggle("text-gray-600");
//         text.classList.toggle("line-through");
//         saveToLocalStorage(todo);
//     }
// }


// function saveToLocalStorage(todo) {
//     let list = getTodoList();
//     list = list.filter(element => element.id !== todo.id);
//     list.push(todo);
//     localStorage.setItem('todoList', JSON.stringify(list));
// }

// function getTodoList() {
//     let todoList = localStorage.getItem('todoList');
//     if (todoList === null) {
//         return [];
//     } else {
//         return JSON.parse(todoList);
//     }
// }

// function displayTodoList() {
//     const todoList = getTodoList();
//     todoList.forEach(element => {
//         const todo = new Todo(element.text, element.id, element.isComplete, element.isUrgent);
//         const checkedClass = element.isComplete ? " text-gray-600 line-through" : "";
//         const template = `<li class="inline-flex justify-between w-full bg-gray-50 shadow-lg rounded py-2 pl-3 my-3" data-id="${todo.id}" id="${todo.id}"">
//                             <span class="font-semibold ${checkedClass}" data-text="text-${todo.id}"> ${todo.text} </span>
//                             <span class="pr-3">
//                                 <button class="cursor-pointer pr-3" type="button" name="trashBtn" value="trash" aria-label="Supprimer la tâche">
//                                     <i class="fas fa-trash-alt " data-button="trash"></i>
//                                 </button>
//                                 <button class="cursor-pointer" type="button" name="checkBtn" value="check" aria-label="Tâche terminée">
//                                     <i class="fas fa-check fa-lg" data-button="check"></i>
//                                 </button> 
//                             </span>
//                             </li>`;
//         list.insertAdjacentHTML('afterbegin', template);
//     });
// }