let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  showLibrary();
});

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
    let toggle = makeToggleButton();
    const card = document.createElement('div');
    card.classList.add('card');
    card.id = i;
    let readStatus = '';
    if (book.read == true) readStatus = 'Already read it';
    if (book.read == false) readStatus = "Haven't read it yet";
    card.innerText = `Title: ${book.title}
                      Author: ${book.author}
                      Number of pages: ${book.pages}
                      ${readStatus}`;
    cards.appendChild(card);
    card.appendChild(toggle);
    card.appendChild(del);
  });
}

function makeDelButton() {
  del = document.createElement('button');
  del.innerText = 'Delete';
  del.classList.add('btn');
  del.classList.add('btn-danger');
  del.addEventListener('click', removeBook)
  return del;
}

function makeToggleButton() {
  tog = document.createElement('button')
  tog.innerText = 'Change read status';
  tog.classList.add('btn');
  tog.classList.add('btn-light');
  tog.addEventListener('click', changeRead);
  return tog;
}

function removeBook(e) {
  let idx = e.target.parentNode.id
  myLibrary.splice(idx, 1);
  showLibrary();
}

function changeRead(e) {
  console.log(e.target.parentNode.parentNode.parentNode)
  myLibrary[e.target.parentNode.id].toggleRead();
  showLibrary();
}

card = document.getElementsByClassName('card')

const dbRefObject = firebase.database().ref().child('object');

dbRefObject.on('value', snap => console.log(snap.val()));



EastofEden = new Book('East of Eden', 'John Steinbeck', 420, true);
god = new Book('The God Delusion', 'Richard Dawkins', 345, true);
mind = new Book('How to Change Your Mind', 'Michael Pollen', 400, true);
lotr = new Book('Lord of the Rings: the Fellowship of the Ring', 'JRR Tolkein', 296, false);
myLibrary.push(EastofEden, god, mind, lotr);
showLibrary();
