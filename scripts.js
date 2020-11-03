let myLibrary = [];
let cards = document.querySelector(".cards-container");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function() {
    let insert = ''
    read == false ? insert = "You haven't read this." : insert = "You have read this.";
    console.log(`${name}, by ${author}, ${pages} pages. ${insert}`);
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function showLibrary() {
  myLibrary.forEach(book => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerText = `Title: ${book.title}
                      Author: ${book.author}
                      Number of pages: ${book.pages}
                      Already read: ${book.read}
                      \n`;
    cards.appendChild(card);
  });
}
addBookToLibrary('East of Eden', 'John Steinbeck', 420, true);
addBookToLibrary('The God Delusion', 'Richard Dawkins', 345, true);
addBookToLibrary('How to Change Your Mind', 'Michael Pollen', 400, true);
showLibrary();
