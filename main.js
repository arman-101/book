const myLibrary = [];

// Constructor
function Book(name, author, pages, read) {
  this.id = crypto.randomUUID();

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Functions for the constructor
function addBookToLibrary(name, author, pages, read) {
  const book = new Book(name, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("The Name of the Wind", "Patrick Rothfuss", 676, true);
addBookToLibrary(
  "The Narrow Road Between Desires",
  "Patrick Rothfuss",
  240,
  false
);
addBookToLibrary("The Wise Man's Fear", "Patrick Rothfuss", 1008, true);
addBookToLibrary(
  "The Slow Regard of Silent Things",
  "Patrick Rothfuss",
  159,
  true
);
addBookToLibrary("The Doors of Stone", "Patrick Rothfuss", 1000, false);

showsBookInLibrary();

function removeBookFromLibrary(bookId) {
  // Filter out the book with the matching id
  const index = myLibrary.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function showsBookInLibrary() {
  const contentDiv = document.querySelector(".content");
  contentDiv.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
            <h3>${book.name}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>
            <button class="toggle-read-btn" data-id="${book.id}">Toggle Read</button>
            <button class="remove-btn" data-id="${book.id}">Remove</button>
        `;

    contentDiv.appendChild(card);
  });

  // Event listener for toggling read status
  const toggleButtons = document.querySelectorAll(".toggle-read-btn");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-id");
      const book = myLibrary.find((b) => b.id === bookId);
      if (book) {
        book.toggleRead();
        showsBookInLibrary(); // re-render to show updated status
      }
    });
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-id");
      removeBookFromLibrary(bookId);
      showsBookInLibrary();
    });
  });
}

Book.prototype.toggleRead = function () {
  this.read = !this.read; // flips true to false or false to true
};

// Adding books with the button
const addBookBtn = document.querySelector(".header button");
const dialog = document.getElementById("bookDialog");
const form = document.getElementById("bookForm");
const cancelBtn = document.getElementById("cancelBtn");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = formData.get("pages");
  const read = formData.get("read") === "on";

  addBookToLibrary(title, author, pages, read);
  showsBookInLibrary();

  dialog.close();
  form.reset();
});

// default
