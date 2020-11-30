'use strict';

var gBooks;
var gNames = ['Artemis Fowl', 'Harry Potter', 'Lord Of The Rings', 'The Monk Who Sold His Ferrari'];
const KEY = 'books';
const PAGE_SIZE = 5;
var gCurrBookShownIdx;
var gSortBy = 'name'
var gPageIdx = 0;


_createBooks();

function getCurrPageNumber() {
    return gPageIdx;
}

function prevPage() {
    gPageIdx--;
    if (gPageIdx * PAGE_SIZE <= 0) gPageIdx = 0;
}

function nextPage() {
    gPageIdx++;
    if (gPageIdx * PAGE_SIZE >= gBooks.length) gPageIdx = 0;
}

function getBooksForSort(books) {
    var sortedBooks;
    if (gSortBy === 'name') sortedBooks = _sortByName(books);
    else sortedBooks = _sortByPrice(books);
    return sortedBooks;
}

function setSort(sortBy) {
    gSortBy = sortBy;

}

function updateBookRating(state) {
    if (state === 'minus') {
        var currRate = gBooks[gCurrBookShownIdx].rate;
        if (currRate <= 0) return;
        currRate--;
        gBooks[gCurrBookShownIdx].rate = currRate;
        _saveBooksToStorage();
        return gBooks[gCurrBookShownIdx].id;
    } else if (state === 'plus') {
        var currRate = gBooks[gCurrBookShownIdx].rate;
        if (currRate >= 10) return;
        currRate++
        gBooks[gCurrBookShownIdx].rate = currRate;
        _saveBooksToStorage();
        return gBooks[gCurrBookShownIdx].id;
    }
}

function showBook(id) {
    gCurrBookShownIdx = gBooks.findIndex(function (book) {
        return id === book.id;
    })

    var bookDetails = gBooks.find(function (book) {
        return id === book.id
    })
    return Object.values(bookDetails)
}

function removeBook(id) {
    var bookToRemoveIdx = gBooks.findIndex(function (book) {
        return id === book.id;
    })
    gBooks.splice(bookToRemoveIdx, 1);
    _saveBooksToStorage();
}

function addBook(name, price, img) {
    if (!img) img = 'noimg';
    gBooks.push(_createBook(name, price, img));
    _saveBooksToStorage();
}

function updateBook(id, newPrice) {
    var bookToUpdateIdx = gBooks.findIndex(function (book) {
        return id === book.id;
    })
    gBooks[bookToUpdateIdx].price = newPrice;
    _saveBooksToStorage();
}


function getBooksForDisplay() {
    var idxStart = gPageIdx * PAGE_SIZE;
    var books = gBooks.slice(idxStart, idxStart + PAGE_SIZE);
    return books;
}



function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (var i = 0; i < gNames.length; i++) {
            var book = gNames[i];
            books.push(_createBook(book));
        }
        gBooks = books;
        _saveBooksToStorage()

    }
    gBooks = books;
}

function _createBook(name, price = getRandomIntInclusive(39.99, 99.99), imgUrl = name, rate = getRandomIntInclusive(1, 10)) {
    return {
        id: makeId(3),
        name,
        price,
        desc: makeLorem(50),
        imgUrl: imgUrl,
        rate: rate
    }
}

function _sortByName(books) {
    var sortedBooks = books.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0
    })
    return sortedBooks;
}

function _sortByPrice(books) {
    var sortedBooks = books.sort(function (a, b) {
        if (a.price < b.price) return -1;
        if (a.price > b.price) return 1;
        return 0;
    })
    return sortedBooks;
}