//user.js
const User = require("../models").User
const Book = require("../models").Book
const Score = require("../models").Score
module.exports = {
  async getAllUsers(req, res) {
    try {
      const userCollection = await User.findAll({attributes: ['id', 'name']});

      res.status(201).send(userCollection);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },

  async getUser(req, res) {
      try {
        const user = await User.findOne({ where: { id: req.params.userId }, attributes: ['id', 'name'] });
        const past = await Score.findAll({
          where: { userId: req.params.userId },
          include: [{model: Book, as: "book", attributes: ['name'], required: true}],
          attributes: ['userScore']
        });
        const present = await Book.findOne({
          where: { userId: req.params.userId },
          include: [{model: User, as: "user", attributes: [], required: true}],
          attributes: ['name']
        });

        let allUserDetails = {
          id: user.id,
          name: user.name,
          books: { 
            past: past !== null ? past : [],
            present: present !== null ? present : []
          }
        };
        
        res.status(201).send(allUserDetails);
      } catch (e) {
        console.log(e);
        res.status(500).send(e);
      }
  },

  async create(req, res) {
    try {
      const userCollection = await User.create({
        name: req.body.name,
      });

      res.status(201).send(userCollection);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  },
}