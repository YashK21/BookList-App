//Book Class: Represent A Boo
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
//UI Class:Handle UL Task
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "book one",
        author: "John Doe",
        isbn: "12345",
      },
      {
        title: "book two",
        author: "John Doe",
        isbn: "123456799",
      },
    ];
    const books = StoredBooks;
    books.forEach((book) => UI.addBookList(book));
  }
  static addBookList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
`;
    list.appendChild(row);
  }
  static deleteBook(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
  }
  static showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    //it will insert div befor the form
    container.insertBefore(div, form);
    //vanish in 3 sec
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
//Store Class:Handle Storage

//Event:Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event:Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  //Prevent actual sbmit
  e.preventDefault();

  //get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("All Fields are required", "danger");
  } else {
    //Instatiate book
    const book = new Book(title, author, isbn);
    console.log(book);

    //Add book to UI
    UI.addBookList(book);

    //shows tje success msg
    UI.showAlert("Book Added", "success");

    //clear fields
    UI.clearFields();
  }
});

//Event:Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
  //shows the delete msg
  UI.showAlert("Book Deleted", "info");
});
