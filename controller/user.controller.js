const db = require('../db');
const bcrypt = require('bcrypt');

class UserController {
  async createUser(req, res) {
    const {name, surname, phone, email, password, num_of_car} = req.body;
    const candidat = await db.query('SELECT person.phone FROM person WHERE person.phone=$1 UNION SELECT parking.phone FROM parking WHERE parking.phone=$1', [phone]);
    if(candidat.rows.length) {
      return res.status(400).json({message: 'Такой пользователь уже существует'});
    }

    const hashedPass = await bcrypt.hash(password, 7);
    const newPerson = await db.query('INSERT INTO person (name, surname, phone, email, password, num_of_car) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, surname, phone, email, hashedPass, num_of_car]);
    res.json(newPerson.rows[0]);
  }
}

module.exports = new UserController();