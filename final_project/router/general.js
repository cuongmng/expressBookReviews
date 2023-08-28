const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "Customer successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "Customer already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify({books},null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn]);
    //res.send(JSON.stringify({filtered},null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksbyauthor = [];
  for (const key in books){
      if (books[key]["author"] === author){
          booksbyauthor.push({
              "isbn": key,
              "title": books[key]["title"],
              "reviews": books[key]["reviews"]
          })
      }
  }
    res.send(JSON.stringify({booksbyauthor},null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let booksbytitle = [];
  for (const key in books){
      if (books[key]["title"] === title){
          booksbytitle.push({
              "isbn": key,
              "author": books[key]["author"],
              "reviews": books[key]["reviews"]
          })
      }
  }
    res.send(JSON.stringify({booksbytitle},null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"]);
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Task 10 - Get books using promises
public_users.get('/get-books',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify({books}, null, 4)));
      });
    get_books.then(() => console.log("Promise resolved"));

  });

// Task 11 - Get book details by ISBN using promises
public_users.get('/get-books-isbn/:isbn',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const isbn = req.params.isbn;
        resolve(res.send(books[isbn]));
      });
    get_books.then(() => console.log("Promise resolved"));

  });

// Task 12 - Get book details by author using promises
public_users.get('/get-books-author/:author',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const author = req.params.author;
        let booksbyauthor = [];
        for (const key in books){
            if (books[key]["author"] === author){
            booksbyauthor.push({
                "isbn": key,
                "title": books[key]["title"],
                "reviews": books[key]["reviews"]
            })
        }
    }

        resolve(res.send(JSON.stringify({booksbyauthor},null,4)));
      });
    get_books.then(() => console.log("Promise resolved"));

  });

// Task 13 - Get book details by title using promises
public_users.get('/get-books-title/:title',function (req, res) {
    const get_books = new Promise((resolve, reject) => {
        const title = req.params.title;
        let booksbytitle = [];
        for (const key in books){
            if (books[key]["title"] === title){
            booksbytitle.push({
                "isbn": key,
                "author": books[key]["author"],
                "reviews": books[key]["reviews"]
            })
        }
    }
        resolve(res.send(JSON.stringify({booksbytitle},null,4)));
      });
    get_books.then(() => console.log("Promise resolved"));
  });

// Get books using async/await
public_users.get('/get-books-asaw', async function (req, res) {
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulating an async operation
      res.send(JSON.stringify({ books }, null, 4));
    } catch (error) {
      console.error("Error while getting book list: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

module.exports.general = public_users;
