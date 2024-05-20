// Selecting elements from the DOM
var popupoverlay = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box");
var addpopupbtn = document.getElementById("add-popup-btn");
var cancelbtn = document.getElementById("cancel-popup");
var container = document.querySelector(".container");
var addbook = document.getElementById("add-book");
var booktitle = document.getElementById("book-title");
var bookauthor = document.getElementById("book-author");
var lines = document.getElementById("book-content");

// Event listeners for the popup
addpopupbtn.addEventListener("click", function() {
    popupbox.style.display = "block";
    popupoverlay.style.display = "block";
});

cancelbtn.addEventListener("click", function(event) {
    event.preventDefault();
    popupbox.style.display = "none";
    popupoverlay.style.display = "none";
});

// Function to add a book
addbook.addEventListener("click", function(event) {
    event.preventDefault();
    if (booktitle.value == "" || bookauthor.value == "" || lines.value == "") {
        alert("Enter the Details Correctly");
    } else {
        addBookToDOM(booktitle.value, bookauthor.value, lines.value);
        saveBookToStorage(booktitle.value, bookauthor.value, lines.value);
        popupbox.style.display = "none";
        popupoverlay.style.display = "none";
        
        // Clear input boxes
        booktitle.value = "";
        bookauthor.value = "";
        lines.value = "";
    }
});


// Function to create book element and append it to the container
function addBookToDOM(title, author, content) {
    var div = document.createElement("div");
    div.setAttribute("class", "book-container");
    div.innerHTML = `<h2>${title}</h2> <h5>${author}</h5> <p>${content}</p>
                     <button onclick="deletebook(event)" style="cursor:pointer;">Delete</button>`;
    container.appendChild(div);
}

// Function to delete a book
function deletebook(event) {
    var bookElement = event.target.parentElement;
    var title = bookElement.querySelector('h2').textContent;
    event.target.parentElement.remove();
    removeBookFromStorage(title);
}

// Save book to local storage
function saveBookToStorage(title, author, content) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push({ title, author, content });
    localStorage.setItem('books', JSON.stringify(books));
}

// Load books from local storage on page load
function loadBooks() {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.forEach(book => {
        addBookToDOM(book.title, book.author, book.content);
    });
}

// Remove book from local storage
function removeBookFromStorage(titleToRemove) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    books = books.filter(book => book.title !== titleToRemove);
    localStorage.setItem('books', JSON.stringify(books));
}

// Initial load of books from storage
document.addEventListener('DOMContentLoaded', loadBooks);
