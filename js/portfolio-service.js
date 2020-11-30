'use strict';

// • Minesweeper
// • In - Picture Game
// • Touch Nums
// • Ball Board
// • Chess
// • Todos
// • Books Shop

var gProjs;


function getProject(id) {
    var project = gProjs.find(function (project) {
        return project.id === id;
    })
    return project;
}

function createProjects() {
    gProjs = [
        _createProj('books', 'Bookshop', 'Managment tool built for bookshop owners', ['HTML', 'CSS', 'Vanilla Javascript']),
        _createProj('minesweeper', 'Minesweeper', 'The classic Minesweeper game', ['HTML', 'CSS', 'Vanilla Javascript']),
        _createProj('inpicture', 'In-Picture', 'Test your knowledge with this quiz game!', ['HTML', 'CSS', 'Vanilla Javascript']),
        _createProj('touchnums', 'Touch The Nums', 'Are you quick enough?', ['HTML', 'CSS', 'Vanilla Javascript']),
        _createProj('ballboard', 'Ball Board', 'Collect them all!', ['HTML', 'CSS', 'Vanilla Javascript']),
        _createProj('todos', 'Todo List', 'A simple todo list', ['HTML', 'CSS', 'Vanilla Javascript']),
    ]
}

function _createProj(id, name, title, labels) {
    return {
        id,
        name,
        title,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, officiis.',
        imgUrl: id,
        url: id,
        labels,
    }
}


function getProjsForDisplay() {
    return gProjs;
}