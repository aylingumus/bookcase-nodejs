//index.js
const userController = require("../controller/user")
const bookController = require("../controller/book")
const scoreController = require("../controller/score")
module.exports = app => {
  app.get("/", (req, res) => {
    res.status(200).send({
      data: "Welcome Node Bookcase Sequlize API",
    })
  });

  app.get("/users", userController.getAllUsers);

  app.get("/users/:userId", userController.getUser);

  app.post("/users", userController.create);

  app.get("/books", bookController.getAllBooks);

  app.get("/books/:bookId", bookController.getBook);

  app.post("/books", bookController.create);

  app.post("/users/:userId/borrow/:bookId", bookController.borrowBook);

  app.post("/users/:userId/return/:bookId", scoreController.returnBook);
}