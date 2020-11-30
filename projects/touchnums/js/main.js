'use strict';
var gNumbers = [];
var gNumbersCopy = [];
var gCount = 1;
var gStopInterval;

gStopInterval = setInterval(isFinished, 100);

function isFinished() {
    if (gCount === 17) stop();
    if (gCount === 26) stop();
    if (gCount === 37) stop();
}

function clickNum(elBtn) {
    if (elBtn.innerText == gCount) {
        elBtn.classList.add('clicked');
        if (gCount === 1) start();
        gCount++;
    }
}

function renderBoard(strHTML) {
    var elTableBody = document.querySelector('.tbody')
    elTableBody.innerHTML = strHTML;
    reset();
}

function createBoard(len, rowColLength) {
    var strHTML = '';
    for (var j = 0; j < rowColLength; j++) {
        strHTML += '<tr>'
        for (var i = 0; i < rowColLength; i++) {
            var randNum = gNumbers.pop();
            strHTML += `<td class="table" onclick="clickNum(this)">${randNum}</td>`
        }
        strHTML += '</tr>'
    }
    renderBoard(strHTML)
}


function createNumbers(userInput) {
    gNumbers = [];
    gCount = 1;
    for (var i = 1; i <= userInput; i++) {
        gNumbers.push(i);
    }
    shuffleArray(gNumbers);
    gNumbersCopy = gNumbers.slice();
    if (userInput === 16) createBoard(userInput, 4);
    else if (userInput === 25) createBoard(userInput, 5);
    else createBoard(userInput, 6);
}



// Utils

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


