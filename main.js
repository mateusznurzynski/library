const books = document.querySelector('.books');
const newBookButton = document.querySelector('.new-book-btn');
const modal = document.querySelector('.modal-form');
const bookForm = document.querySelector('.book-form');
const submitButton = document.querySelector('.submit-btn');

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

function addNewBook(title, author, pages, read) {
  allBooks.push(new Book(title, author, pages, read));
  refreshBooks();
  console.log(allBooks);
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
      ? 'Status: Already read'
      : 'Status: Not read yet';
    if (book.read) {
      alreadyRead.classList.add('green');
    } else {
      alreadyRead.classList.add('red');
    }

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
