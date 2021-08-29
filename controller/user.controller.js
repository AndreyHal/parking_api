const db = require('../db');
const bcrypt = require('bcrypt');

class UserController {
  async createUser(req, res) {
    const {name, surname, phone, email, password, num_of_car} = req.body;
    const candidat = await db.query('SELECT * FROM person WHERE phone=$1', [phone]);
    if(candidat.rows.length) {
      return res.status(400).send({message: 'Такой пользователь уже существует'});
    }

    const hashedPass = await bcrypt.hash(password, 7);
    const newPerson = await db.query('INSERT INTO person (name, surname, phone, email, password, num_of_car) values ($1, $2, $3, $4, $5, $6) RETURNING *', [name, surname, phone, email, hashedPass, num_of_car]);
    res.json(newPerson.rows[0]);
  }
}

module.exports = new UserController();