const db = require('../db');
const bcrypt = require('bcrypt');

class ParkingController {
  async createParking(req, res) {
    const {name, phone, email, password, city, street, house, count_place, price, free_places} = req.body;
    const candidat = await db.query('SELECT person.phone FROM person WHERE person.phone=$1 UNION SELECT parking.phone FROM parking WHERE parking.phone=$1', [phone]);
    if(candidat.rows.length) {
      return res.status(400).send({message: 'Такой пользователь уже существует'});
    }

    const hashedPass = await bcrypt.hash(password, 7);
    const newPerson = await db.query('INSERT INTO parking (name, phone, email, password, city, street, house, count_place, price, free_places) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [name, phone, email, hashedPass, city, street, house, count_place, price, free_places]);
    res.json(newPerson.rows[0]);
  }

  async getParking(req, res) {
    const {user_id} = req;
    const parking = await db.query('SELECT id, name, phone, email, city, street, house, count_place, price, free_places, description, CASE WHEN parking.id IN (SELECT parking_id FROM favorite WHERE user_id=$1) THEN true ELSE false END AS is_favorite FROM parking', [user_id]);
    res.json(parking.rows);
  }

  async getFavorite(req, res) {
    const {user_id} = req;
    const favorite = await db.query('SELECT parking.id, name, phone, email, city, street, house, count_place, price, free_places, description, true AS is_favorite FROM parking INNER JOIN favorite ON favorite.user_id=$1', [user_id]);
    res.json(favorite.rows);
  };

  async addFavorite(req, res) {
    const {parking_id} = req.body;
    const {user_id} = req;
    const favorite = await db.query('INSERT INTO favorite (user_id, parking_id) VALUES ($1, $2) RETURNING *', [user_id, parking_id]);
    res.json(favorite.rows[0]);
  };

  async removeFavorite(req, res) {
    const {parking_id} = req.body;
    const {user_id} = req;
    const favorite = await db.query('DELETE FROM favorite WHERE user_id=$1 AND parking_id=$2', [user_id, parking_id]);
    res.json(favorite.rows[0]);
  };

  async getOneParking(req, res) {
    const {id} = req.params;
    const parking = await db.query('SELECT id, name, price, free_places, city, street, house FROM parking WHERE id=$1', [id]);
    res.json(parking.rows[0]);
  }

  async updateParking(req, res) {
    const {id, name, phone, email, city, street, house, count_place, price, free_places, description} = req.body;
    const parking = await db.query('UPDATE parking SET name=$1, phone=$2, email=$3, city=$4, street=$5, house=$6, count_place=$7, price=$8, free_places=$9, description=$10 WHERE id=$11 RETURNING *', [name, phone, email, city, street, house, count_place, price, free_places, description, id]);
    res.json(parking.rows[0]);
  }
}

module.exports = new ParkingController();