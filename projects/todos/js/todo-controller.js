'use strict';
function renderTodos() {
    var todos = getTodosForDisplay();
    var todosTotal = document.querySelector('.todo-total');
    var todosActive = document.querySelector('.todo-active');
    todos = getTodosForSort(todos);
    var strHTMLs = todos.map(function (todo) {
        return `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')">
                                            ${todo.txt}
                                            <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                                        </li>`
    })

    // console.log(strHTMLs)


    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    todosTotal.innerText = getTotalCount()
    todosActive.innerText = getActiveCount()
    noTodosDisplay(todos);
}

function noTodosDisplay(todos) {
    var elTodoList = document.querySelector('.todo-list');
    var filter = getFilterState();
    if (filter === 'all' && !todos.length) {
        elTodoList.innerText = 'No todos';
    }
    else if (filter === 'active' && !getActiveCount()) {
        elTodoList.innerText = 'No Active Todos';
    }
    else if (filter === 'done' && !getDoneCount()) {
        elTodoList.innerText = 'No Done Todos';
    }

}



function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var userChoice = confirm('Are you sure you want to delete this todo?')
    if (!userChoice) return;
    removeTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var elImportanceTxt = document.querySelector('input[name=importanceTxt]');
    if (!elImportanceTxt.value) elImportanceTxt.value = 3;
    var msg = document.querySelector('.inputPopupMsg');
    if (!elTodoTxt.value) { // If any input is not valid, show a message and don't add todo.
        msg.innerText = 'Please enter a todo';
        return;
    }

    addTodo(elTodoTxt.value, elImportanceTxt.value);
    renderTodos();
    elTodoTxt.value = '';
    elImportanceTxt.value = '';
    msg.innerText = '';

}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    console.log('Sorting by', sortBy);
    setSort(sortBy);
    renderTodos();
}
