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

  async getUserSettings(req, res) {
    const {user_id} = req;
    const person = await db.query('SELECT id, name, surname, phone, email, num_of_car FROM person WHERE id=$1', [user_id]);
    res.json(person.rows[0]);
  }

  async updateUserSettings(req, res) {
    const {name, surname, phone, email, num_of_car} = req.body;
    const {user_id} = req;
    const person = await db.query('UPDATE person SET name=$1, surname=$2, phone=$3, email=$4, num_of_car=$5 WHERE id=$6', [name, surname, phone, email, num_of_car, user_id]);
    res.send('OK');
  }
}

module.exports = new UserController();