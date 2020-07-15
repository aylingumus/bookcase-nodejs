//score.js
const Score = require("../models").Score
const User = require("../models").User
const Book = require("../models").Book
module.exports = {
  async returnBook(req, res) {
    try {
      const bookCollection = await Book.findOne({
        where: { id: req.params.bookId, userId: req.params.userId, available: false },
      });

      if (bookCollection) {
        await Score.create({
          userId: req.params.userId, 
          bookId: req.params.bookId,
          userScore: req.body.score
        });

        const scoresCollection = await Score.findAll({
          where: { bookId: req.params.bookId },
          attributes: ["userScore", "userId", "bookId"],
          group: ["userScore", "userId", "bookId"],
        });

        var i = 0, sum = 0, len = scoresCollection.length;
        while (i < len) {
            sum = sum + scoresCollection[i++].userScore;
        }
        let averageScore = sum / len;

        await bookCollection.update({
          where: { id: req.param.bookId, userId: req.params.userId },
          available: true,
          score: averageScore,
          userId: null
        });
        
        res.status(201).send("Succesfully book returned");
      } else {
        res.status(404).send("Book Not Found");
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  
  async createScore(req, res) {
    try {
      const score = await Score.create({
        userId: req.body.userId,
        bookId: req.body.bookId,
        userScore: req.body.userScore,
      });
      
      res.status(201).send(score);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
}