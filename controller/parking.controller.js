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
    const newPerson = await db.query('INSERT INTO parking (name, phone, email, password, city, street, house, count_place, price, free_places) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [name, phone, email, hashedPass, city, street, house, count_place, price, free_places]);
    res.json(newPerson.rows[0]);
  }

  async getParking(req, res) {
    // const {} = req.body;
    const arr = await db.query('SELECT id, name, price, free_places, city, street, house FROM parking');
    res.json(arr.rows);
  }

  async getOneParking(req, res) {
    const {id} = req.params;
    const parking = await db.query('SELECT id, name, price, free_places, city, street, house FROM parking WHERE id=$1', [id]);
    res.json(parking.rows[0]);
  }

  async updateParking(req, res) {
    const {id, name, phone, email, city, street, house, count_place, price, free_places} = req.body;
    const parking = await db.query('UPDATE parking SET name=$1, phone=$2, email=$3, city=$4, street=$5, house=$6, count_place=$7, price=$8, free_places=$9 WHERE id=$10 RETURNING *', [name, phone, email, city, street, house, count_place, price, free_places, id]);
    res.json(parking.rows[0]);
  }
}

module.exports = new ParkingController();