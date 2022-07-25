const books = document.querySelector('.books');

let allBooks = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = Boolean(read);
}

function addNewBook(title, author, pages, read) {
  allBooks.push(new Book(title, author, pages, read));
}

addNewBook('Krzyżacy', 'Henryk Sienkiewicz', 1234);
console.log(allBooks);

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
