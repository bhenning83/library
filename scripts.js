let myLibrary = [];

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

function addBookToLibrary() {
  let book = new Book(
    form.title.value,
    form.author.value,
    form.pages.value,
    form.read.checked
    );

  myLibrary.push(book);
}

function showLibrary() {
  let cards = document.querySelector(".cards-box");
  cards.innerHTML = '';
  myLibrary.forEach((book, i) => {
    let del = makeDelButton();
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = i;
    card.innerText = `Title: ${book.title}
                      Author: ${book.author}
                      Number of pages: ${book.pages}
                      Already read: ${book.read}
                      \n`;
    cards.appendChild(card);
    card.appendChild(del);
  });
}

function createCard(book, cards, i) {
  
}

function makeDelButton() {
  del = document.createElement('button')
  del.innerText = 'Delete';
  del.classList.add('btn');
  del.classList.add('btn-danger');
  del.addEventListener('click', removeBook)
  return del;
}

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  showLibrary();
});

function removeBook(e) {
  let idx = e.target.parentNode.id
  myLibrary.splice(idx, 1);
  showLibrary();
}

EastofEden = new Book('East of Eden', 'John Steinbeck', 420, true);
god = new Book('The God Delusion', 'Richard Dawkins', 345, true);
mind = new Book('How to Change Your Mind', 'Michael Pollen', 400, true);
lotr = new Book('Lord of the Rings: the Fellowship of the Ring', 'JRR Tolkein', 296, false);
myLibrary.push(EastofEden, god, mind, lotr);
showLibrary();
