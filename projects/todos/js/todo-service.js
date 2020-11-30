'use strict';
const STORAGE_KEY = 'todosDB';

var gTodos;
var gFilterBy = 'all';
var gSortBy = 'txt';

_createTodos();

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function (todo) {
        return (todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active')

    })
    return todos;
}

function getTodosForSort(todos) {
    var sortedTodos;
    if (gSortBy === 'txt') sortedTodos = _sortByTxt(todos);
    else if (gSortBy === 'created') sortedTodos = _sortByCreated(todos);
    else sortedTodos = _sortByImportance(todos);
    return sortedTodos;
}



function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}
function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}

function addTodo(txt, importance) {
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: +importance
    }
    gTodos.unshift(todo)
    _saveTodosToStorage();
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    var count = 0;
    gTodos.forEach(function (todo) {
        if (!todo.isDone) count++;
    })
    return count;
}

function getDoneCount() {
    var count = 0;
    gTodos.forEach(function (todo) {
        if (todo.isDone) count++
    })
    return count;
}

function getFilterState() {
    return gFilterBy;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)

    if (!todos || todos.length === 0) {
        todos = [
            {
                id: 't101',
                txt: 'Do this please',
                isDone: false,
                createdAt: Date.now(),
                importance: 1
            },
            {
                id: 't102',
                txt: 'Do That now',
                isDone: true,
                createdAt: Date.now(),
                importance: 1
            },
            {
                id: 't103',
                txt: 'Clean it up',
                isDone: true,
                createdAt: Date.now(),
                importance: 1
            },
        ];

    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _sortByTxt(todos) {
    var sortedText = todos.sort(function (a, b) {
        if (a.txt < b.txt) return -1;
        if (a.txt > b.txt) return 1;
        return 0;
    })
    return sortedText;
}

function _sortByCreated(todos) {
    var sortedDate = todos.sort(function (a, b) {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
    })
    return sortedDate;
}

function _sortByImportance(todos) {
    var sortedImportance = todos.sort(function (a, b) {
        if (a.importance < b.importance) return -1;
        if (a.importance > b.importance) return 1;
        return 0;
    })
    return sortedImportance;
}