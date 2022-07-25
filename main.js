const books = document.querySelector('.books');
const newBookButton = document.querySelector('.new-book-btn');
const modal = document.querySelector('.modal-form');
const bookForm = document.querySelector('.book-form');
const submitButton = document.querySelector('.submit-btn');
const STATUS_MESSAGE_TRUE = 'Status: Already read';
const STATUS_MESSAGE_FALSE = 'Status: Not read yet';

newBookButton.addEventListener('click', toggleModal);
modal.addEventListener('click', toggleModal);
bookForm.addEventListener('click', (e) => {
  e.stopPropagation();
});
submitButton.addEventListener('click', submitBookForm);

let allBooks = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

Book.prototype.toggleRead = function (e) {
  this.read = this.read ? false : true;
  e.target.classList.toggle('true');
  if (this.read) {
    e.target.textContent = STATUS_MESSAGE_TRUE;
  } else {
    e.target.textContent = STATUS_MESSAGE_FALSE;
  }
  console.log(this);
};

function addNewBook(title, author, pages, read) {
  allBooks.push(new Book(title, author, pages, read));
  refreshBooks();
}

addNewBook('Krzyżacy', 'Henryk Sienkiewicz', 1234, true);

function refreshBooks() {
  books.textContent = '';
  createCards();
}

function createCards() {
  const bookCard = document.createElement('div');
  const cardTable = document.createElement('table');
  bookCard.appendChild(cardTable);
  bookCard.classList.add('book-card');

  const read = document.createElement('div');
  read.classList.add('read');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove book';

  const cardRow = document.createElement('tr');
  const rowTitle = document.createElement('th');
  const rowContent = document.createElement('td');

  cardRow.appendChild(rowTitle);
  cardRow.appendChild(rowContent);

  allBooks.forEach((book) => {
    const newBookCard = bookCard.cloneNode(true);
    const newTitle = cardRow.cloneNode(true);
    const newAuthor = cardRow.cloneNode(true);
    const newPages = cardRow.cloneNode(true);
    const alreadyRead = read.cloneNode(true);
    const button = removeButton.cloneNode(true);

    newBookCard.setAttribute('data-book-id', allBooks.indexOf(book));

    newTitle.firstChild.textContent = 'Title: ';
    newTitle.lastChild.textContent = book.title ? `„${book.title}”` : '';

    newAuthor.firstChild.textContent = 'Author: ';
    newAuthor.lastChild.textContent = book.author
      ? book.author
      : 'Not specified';

    newPages.firstChild.textContent = 'Pages: ';
    newPages.lastChild.textContent = book.pages ? book.pages : 'Not specified';

    alreadyRead.textContent = book.read
      ? STATUS_MESSAGE_TRUE
      : STATUS_MESSAGE_FALSE;
    if (book.read) {
      alreadyRead.classList.add('true');
    }

    alreadyRead.addEventListener('click', (e) => {
      book.toggleRead.call(book, e);
    });

    button.addEventListener('click', removeBook);

    newBookCard.firstChild.appendChild(newTitle);
    newBookCard.firstChild.appendChild(newAuthor);
    newBookCard.firstChild.appendChild(newPages);
    newBookCard.appendChild(alreadyRead);
    newBookCard.appendChild(button);

    books.appendChild(newBookCard);
  });
}

function toggleModal(e) {
  modal.classList.toggle('active');
}

function submitBookForm(e) {
  const newTitle = document.querySelector('#book-title').value;
  const newAuthor = document.querySelector('#book-author').value;
  const newPages = document.querySelector('#book-pages').value;
  const newRead = document.querySelector('#book-read').checked;

  if (!newTitle) {
    return;
  }

  addNewBook(newTitle, newAuthor, newPages, newRead);
  toggleModal();
  bookForm.reset();
  e.preventDefault();
}

function removeBook(e) {
  const bookId = e.target.parentNode.getAttribute('data-book-id');
  allBooks.splice(bookId, 1);
  refreshBooks();
}

// function toggleRead(e) {
//   const bookId = e.target.parentNode.getAttribute('data-book-id');
//   if (e.target.classList.contains('green')) {
//     e.target.classList.remove('green');
//     e.target.classList.add('red');
//     e.target.textContent = STATUS_MESSAGE_FALSE;
//     allBooks[bookId].read = false;
//   } else {
//     e.target.classList.remove('red');
//     e.target.classList.add('green');
//     e.target.textContent = STATUS_MESSAGE_TRUE;
//     allBooks[bookId].read = true;
//   }
//   console.log(allBooks);
// }
