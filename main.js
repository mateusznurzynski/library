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
  console.log(allBooks);
}

addNewBook('Krzyżacy', 'Henryk Sienkiewicz', 1234);

allBooks.forEach((book) => {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookTitle = document.createElement('p');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = `Title: ${book.title}`;

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = `Author: ${book.author}`;

  const bookPages = document.createElement('p');
  bookPages.classList.add('book-pages');
  bookPages.textContent = `Pages: ${book.pages}`;

  const bookRead = document.createElement('p');
  bookRead.classList.add('book-read');
  bookRead.textContent = book.read ? 'Already read' : 'Not read yet';

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookRead);

  books.appendChild(bookCard);

  console.log(bookCard);
});

function toggleModal(e) {
  modal.classList.toggle('active');
}

function submitBookForm(e) {
  const newTitle = document.querySelector('#book-title').value;
  const newAuthor = document.querySelector('#book-author').value;
  const newPages = document.querySelector('#book-pages').value;
  const newRead = document.querySelector('#book-read').checked;

  addNewBook(newTitle, newAuthor, newPages, newRead);
  toggleModal();
  bookForm.reset();
  e.preventDefault();
}
