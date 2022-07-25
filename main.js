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
