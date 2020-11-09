let myLibrary = [];
let indexValue = 4;
let loaded = false

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

database.ref().on('value', function(snap){
  if (loaded == false) {
    snap.forEach(function(childNodes){
      let index = childNodes.val().index;
      let title = childNodes.val().title;
      let author = childNodes.val().author;
      let pages = childNodes.val().pages;
      let read = childNodes.val().read;

      let book = new Book(index, title, author, pages, read);
      myLibrary.push(book);

      indexValue++; //to avoid repeat usage of an index number
    });
  }
  loaded = true;
  if (loaded == true && myLibrary.length == 0) {
    setInitLib();
    console.log(myLibrary.length)
  }
  showLibrary();
});

function setInitLib() {
  writeData(0, 'East of Eden', 'John Steinbeck', 420, true);
  writeData(1, 'A Brief History of Time', 'Stephen Hawking', 345, true);
  writeData(2, 'The Catcher in the Rye', 'J. D. Salinger', 400, true);
  writeData(3, 'Lord of the Rings: the Fellowship of the Ring', 'JRR Tolkein', 300, false);
}

function writeData(index, title, author, pages, read) {
	firebase.database().ref(index).set({
    index: index,
		title: title,
		author: author,
		pages: pages,
		read: read
	});
}

function Book(index, title, author, pages, read) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function showLibrary() {
  let cards = document.querySelector(".cards-box");
  cards.innerHTML = '';
  myLibrary.forEach((book, i) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const buttonBox = document.createElement('div');
    buttonBox.classList.add('button-box')
    card.id = i;
    let readStatus = '';
    if (book.read == true) readStatus = 'Already read it';
    if (book.read == false) readStatus = "Haven't read it yet";
    card.innerText = `Title: ${book.title}
                      Author: ${book.author}
                      Number of pages: ${book.pages}
                      ${readStatus}`;
    cards.appendChild(card);

    card.appendChild(buttonBox);

    let toggle = makeToggleButton(book);
    buttonBox.appendChild(toggle);

    let del = makeDelButton(book);
    buttonBox.appendChild(del);
  });
}

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  form.reset();
  showLibrary();
});

function addBookToLibrary() {
  let title = form.title.value;
  let author = form.author.value;
  let pages = form.pages.value;
  let read = form.read.checked;
  
  let book = new Book(indexValue, title, author, pages, read);

  myLibrary.push(book);
  writeData(indexValue, title, author, pages, read);
  indexValue++;
}

function makeDelButton(book) {
  del = document.createElement('button');
  del.innerText = 'Delete';
  del.classList.add('btn');
  del.classList.add('btn-danger');
  del.addEventListener('click', function() {
    removeBook(book)
  })
  return del;
}

function removeBook(book) {
  idx = myLibrary.indexOf(book);
  myLibrary.splice(idx, 1);
  showLibrary();

  database.ref(book.index).remove();
}

function makeToggleButton(book) {
  tog = document.createElement('button')
  tog.innerText = 'Change read status';
  tog.classList.add('btn');
  tog.style.background = '#99dc35';
  tog.addEventListener('click', function() {
    toggleRead(book)
  });
  return tog;
}

function toggleRead(book) {
  book.read = !book.read;
  database.ref(book.index).update({
    read: book.read
  });
  showLibrary();
}






