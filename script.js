const  db = (() => {
  let loaded = [];

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
        library.shelf.push(book);
  
        library.indexValue++; //to avoid repeat usage of an index number
      });
    }
    loaded = true;
    if (loaded == true && library.shelf.length == 0) {
      setInitLib();
    }
    library.showLibrary();
  });

  function setInitLib() {
    writeData(0, 'East of Eden', 'John Steinbeck', 420, true);
    writeData(1, 'A Brief History of Time', 'Stephen Hawking', 278, true);
    writeData(2, 'The Catcher in the Rye', 'J. D. Salinger', 229, true);
    writeData(3, 'Lord of the Rings: the Fellowship of the Ring', 'JRR Tolkein', 359, false);
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

  return { writeData }
})();

class Book {
  constructor(index, title, author, pages, read) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

const library = (() => {
  let indexValue = 4;
  let shelf = [];

  //Cache DOM
  const form = document.querySelector('form')
  const cardsBox = document.querySelector(".cards-box");
  
  //Bind Events
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

    shelf.push(book);
    db.writeData(indexValue, title, author, pages, read);
    indexValue++;
  }

  function removeBookFromLibrary(book) {
    idx = shelf.indexOf(book);
    shelf.splice(idx, 1);
    showLibrary();
  }

  function showLibrary() {
    cardsBox.innerHTML = '';
    shelf.forEach((book, i) => {
      //houses book info
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

      let toggle = _makeToggleButton(book);
      let del = makeDelButton(book);

       //houses read status and delete buttons
      const buttonBox = document.createElement('div');
      buttonBox.classList.add('button-box');
      
      cardsBox.appendChild(card);
      card.appendChild(buttonBox);
      buttonBox.appendChild(toggle);
      buttonBox.appendChild(del);
    });
  }

  function _makeToggleButton(book) {
    tog = document.createElement('button')
    tog.innerText = 'Change read status';
    tog.classList.add('btn');
    tog.classList.add('toggle');
    tog.addEventListener('click', function() {
      book.toggleRead();
      showLibrary();
    });
    return tog;
  }

  function makeDelButton(book) {
    del = document.createElement('button');
    del.innerText = 'Delete';
    del.classList.add('btn');
    del.classList.add('btn-danger');
    del.classList.add('del');
    del.addEventListener('click', function() {
      removeBookFromLibrary(book);
    });
    return del;
  }

  return { shelf, indexValue, showLibrary }
})();