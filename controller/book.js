//book.js
const Book = require("../models").Book
module.exports = {
  async getAllBooks(req, res) {
    try {
      const bookCollection = await Book.findAll({attributes: ['id', 'name']});

      res.status(201).send(bookCollection);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async getBook(req, res) {
      try {
        const book = await Book.findOne({ where: { id: req.params.bookId }, attributes: ['id', 'name', 'score'] });
        
        res.status(201).send(book);
      } catch (e) {
        console.log(e);
        res.status(500).send(e);
      }
  },

  async borrowBook(req, res) {
    try {
      const bookCollection = await Book.findOne({
        where: { id: req.params.bookId },
      })

      if (bookCollection) {
        const updatedBook = await bookCollection.update({ 
          available: false, userId: req.params.userId
        });
        
        res.status(201).send("Succesfully book borrowed");
      } else {
        res.status(404).send("Book Not Found");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async create(req, res) {
    try {
      const bookCollection = await Book.create({
        name: req.body.name,
        available: true,
        score: -1
      });
      
      res.status(201).send(bookCollection);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
}