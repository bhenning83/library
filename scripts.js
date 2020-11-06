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

    let toggle = makeToggleButton();
    card.appendChild(toggle);

    let del = makeDelButton();
    card.appendChild(del);
  });
  database.ref().set(myLibrary);
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

EastofEden = new Book('East of Eden', 'John Steinbeck', 420, true);
god = new Book('The God Delusion', 'Richard Dawkins', 345, true);
mind = new Book('How to Change Your Mind', 'Michael Pollen', 400, true);
lotr = new Book('Lord of the Rings: the Fellowship of the Ring', 'JRR Tolkein', 296, false);
myLibrary.push(EastofEden, god, mind, lotr);
showLibrary();

var firebaseConfig = {
  apiKey: "AIzaSyCDLxoWNQM9IsQC9-WFQy_joqcdBWzWjCk",
  authDomain: "library-41aba.firebaseapp.com",
  databaseURL: "https://library-41aba.firebaseio.com",
  projectId: "library-41aba",
  storageBucket: "library-41aba.appspot.com",
  messagingSenderId: "273428719470",
  appId: "1:273428719470:web:f13d601edf20f78e2d437f",
  measurementId: "G-R7Z3V222XZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let database = firebase.database();

const dbRefObject = database.ref().child('object');
saveLibrary => database.ref().set(myLibrary);

dbRefObject.on('value', snap => {
  if (snap.exists() == false) {
    database.ref().set(myLibrary)
  } else {
    myLibrary = snap.val();
  }
});


