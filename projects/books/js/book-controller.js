'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooksForDisplay();
    books = getBooksForSort(books);
    var strHTML = books.map(function (book) {
        return `
        <tr>
            <td>${book.id}</td>
            <td class="book-name">${book.name}</td>
            <td class="book-price">${book.price}₪</td>
            <td><button class="btn read-btn" onclick="onShowBook('${book.id}')">Read</button></td>
            <td><button class="btn update-btn" onclick="onUpdateButton('${book.id}')">Update</button></td>
            <td><button class="btn delete-btn" onclick="onRemoveBook('${book.id}')">Delete</button></td>        
        </tr>
        `
    })
    document.querySelector('.books-container').innerHTML = strHTML.join('')
}

function onShowBook(id) {
    var book = showBook(id);
    showDetailsModal();
    renderBooks();
    var elBookTitle = document.querySelector('.modal-title');
    var elBookPrice = document.querySelector('.modal-price');
    var elBookDesc = document.querySelector('.modal-desc');
    var elBookImg = document.querySelector('.modal-img');
    var elBookRate = document.querySelector('.rate-number');
    elBookTitle.innerText = book[1];
    elBookPrice.innerText = `Price: ${book[2]}₪`;
    elBookDesc.innerText = book[3];
    if (book[4].length > 30) {
        elBookImg.src = book[4]
        return;
    }
    elBookImg.src = `./images/${book[4]}.png`
    elBookRate.innerText = book[5]

}

function showDetailsModal() {
    var elDetailsModal = document.querySelector('.details-container');
    elDetailsModal.classList.toggle('move');
}

function onUpdateBook(id) {
    var elNewPrice = document.querySelector('input[name=updatedPrice]');
    if (!typeof elNewPrice.value === 'number' || !elNewPrice.value) return;
    var elUpdateModal = document.querySelector('.update-container');
    updateBook(id, elNewPrice.value)
    elUpdateModal.hidden = true;
    renderBooks();
}

function onUpdateButton(id) {
    var elUpdateModal = document.querySelector('.update-container')
    if (elUpdateModal.hidden) elUpdateModal.hidden = false;
    else elUpdateModal.hidden = true;
    var strHTML = `
    <div class="update-modal">
        <span onclick="onCloseUpdateModal()" class="close-modal">X</span>
        <span>* - Inputs are required.</span>
            <label>Book Price* <br>
                <input class="update-input" type="number" name="updatedPrice" placeholder="Book Price">
            </label>
                    <button class="btn" onclick="onUpdateBook('${id}', event)">Update</button>
    </div>
    `
    document.querySelector('.update-container').innerHTML = strHTML;
}

function onCloseUpdateModal() {
    document.querySelector('.update-container').hidden = true;
}



function onRemoveBook(id) {
    removeBook(id);
    renderBooks();
}

function onAddModal() {
    var elAddBookModal = document.querySelector('.add-book-modal');
    var elWarning = document.querySelector('.add-warning')
    elWarning.hidden = true;
    if (elAddBookModal.hidden) {
        elAddBookModal.hidden = false;
    } else {
        elAddBookModal.hidden = true;
    }
}

function onAddBook() {
    var elBookName = document.querySelector('input[name=title]');
    var elPrice = document.querySelector('input[name=price]');
    var elImg = document.querySelector('input[name=img]');
    var elAddBookModal = document.querySelector('.add-book-modal');
    var elWarning = document.querySelector('.add-warning');
    while (!typeof elPrice.value === 'number' || !elBookName.value || !elPrice.value) {
        elWarning.hidden = false;
        return;
    }
    elAddBookModal.hidden = true;
    addBook(elBookName.value, elPrice.value, elImg.value);
    elBookName.value = ''
    elPrice.value = ''
    elImg.value = ''
    renderBooks();

}

function onMinusClick(ev) {
    ev.stopPropagation();
    var bookId = updateBookRating('minus')
    var book = showBook(bookId);
    var elBookRate = document.querySelector('.rate-number');
    elBookRate.innerText = book[5]
}

function onPlusClick(ev) {
    ev.stopPropagation();
    var bookId = updateBookRating('plus');
    var book = showBook(bookId);
    var elBookRate = document.querySelector('.rate-number');
    elBookRate.innerText = book[5]
}

function onSetSort(sortBy) {
    setSort(sortBy);
    renderBooks();
}

function onPrevPage() {
    prevPage();
    showCurrPageNumber();
    renderBooks();
}

function onNextPage() {
    nextPage();
    showCurrPageNumber();
    renderBooks();
}

function showCurrPageNumber() {
    var pageNumber = getCurrPageNumber()
    var elPageNumber = document.querySelector('.page-number');
    elPageNumber.innerText = pageNumber;
}