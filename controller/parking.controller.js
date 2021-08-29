const db = require('../db');
const bcrypt = require('bcrypt');

class ParkingController {
  async createParking(req, res) {
    const {name, phone, email, password, city, street, house, count_place, price, free_places} = req.body;
    const candidat = await db.query('SELECT * FROM parking WHERE phone=$1', [phone]);
    if(candidat.rows.length) {
      return res.status(400).send({message: 'Такой пользователь уже существует'});
    }

    const hashedPass = await bcrypt.hash(password, 7);
    const newPerson = await db.query('INSERT INTO parking (name, phone, email, password, city, street, house, count_place, price, free_places) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [name, phone, email, hashedPass, city, street, house, count_place, price, free_places]);
    res.json(newPerson.rows[0]);
  }
}

module.exports = new ParkingController();