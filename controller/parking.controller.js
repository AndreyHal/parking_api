const db = require('../db');
const bcrypt = require('bcrypt');

class ParkingController {
  async createParking(req, res) {
    const {name,
           phone,
           email,
           password,
           city,
           street,
           house,
           count_place,
           price,
           free_places,
           video_monitoring,
           covered_parking,
           underground_parking,
           motorbike,
           car,
           truck} = req.body;
    const candidat = await db.query('SELECT person.phone FROM person WHERE person.phone=$1 UNION SELECT parking.phone FROM parking WHERE parking.phone=$1', [phone]);
    if(candidat.rows.length) {
      return res.status(400).send({message: 'Такой пользователь уже существует'});
    }

    const hashedPass = await bcrypt.hash(password, 7);
    const newPerson = await db.query(`INSERT INTO parking (name,
                                                           phone,
                                                           email,
                                                           password,
                                                           city,
                                                           street,
                                                           house,
                                                           count_place,
                                                           price,
                                                           free_places,
                                                           video_monitoring,
                                                           covered_parking,
                                                           underground_parking,
                                                           motorbike,
                                                           car,
                                                           truck) VALUES ($1,
                                                                          $2,
                                                                          $3,
                                                                          $4,
                                                                          $5,
                                                                          $6,
                                                                          $7,
                                                                          $8,
                                                                          $9,
                                                                          $10,
                                                                          $11,
                                                                          $12,
                                                                          $13,
                                                                          $14,
                                                                          $15,
                                                                          $16)`, [name,
                                                                                  phone,
                                                                                  email,
                                                                                  hashedPass,
                                                                                  city,
                                                                                  street,
                                                                                  house,
                                                                                  count_place,
                                                                                  price,
                                                                                  free_places,
                                                                                  video_monitoring,
                                                                                  covered_parking,
                                                                                  underground_parking,
                                                                                  motorbike,
                                                                                  car,
                                                                                  truck]);
    res.send();
  }

  async getParking(req, res) {
    const {user_id} = req;
    const parking = await db.query(`SELECT id,
                                           name,
                                           phone,
                                           email,
                                           city,
                                           street,
                                           house,
                                           count_place,
                                           price,
                                           free_places,
                                           description,
                                           video_monitoring,
                                           covered_parking,
                                           underground_parking,
                                           motorbike,
                                           car,
                                           truck, CASE WHEN parking.id IN (SELECT parking_id FROM favorite WHERE user_id=$1) THEN true ELSE false END AS is_favorite FROM parking`, [user_id]);
    res.json(parking.rows);
  }

  async getFavorite(req, res) {
    const {user_id} = req;
    // const favorite = await db.query('SELECT parking.id, name, phone, email, city, street, house, count_place, price, free_places, description, true AS is_favorite FROM parking INNER JOIN favorite ON favorite.user_id=$1', [user_id]);
    const arr = await db.query(`SELECT id,
                                       name,
                                       phone,
                                       email,
                                       city,
                                       street,
                                       house,
                                       count_place,
                                       price,
                                       free_places,
                                       description,
                                       video_monitoring,
                                       covered_parking,
                                       underground_parking,
                                       motorbike,
                                       car,
                                       truck, CASE WHEN parking.id IN (SELECT parking_id FROM favorite WHERE user_id=$1) THEN true ELSE false END AS is_favorite FROM parking`, [user_id]);
    const favorite = arr.rows.filter(item => item.is_favorite===true);
    res.json(favorite);
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
    const parking = await db.query(`SELECT id,
                                           name,
                                           price,
                                           free_places,
                                           city,
                                           street,
                                           house,
                                           description,
                                           video_monitoring,
                                           covered_parking,
                                           underground_parking,
                                           motorbike,
                                           car,
                                           truck FROM parking WHERE id=$1`, [id]);
    res.json(parking.rows[0]);
  }

  async getParkingSettings(req, res) {
    const {user_id} = req;
    const parking = await db.query(`SELECT id,
                                           name,
                                           phone,
                                           email,
                                           city,
                                           street,
                                           house,
                                           count_place,
                                           price,
                                           free_places,
                                           description,
                                           video_monitoring,
                                           covered_parking,
                                           underground_parking,
                                           motorbike,
                                           car,
                                           truck FROM parking WHERE id=$1`, [user_id]);
    res.json(parking.rows[0]);
  }

  async updateParkingSettings(req, res) {
    const {name,
           phone,
           email,
           city,
           street,
           house,
           count_place,
           price,
           free_places,
           description,
           video_monitoring,
           covered_parking,
           underground_parking,
           motorbike,
           car,
           truck} = req.body;
    const {user_id} = req;
    const parking = await db.query(`UPDATE parking SET name=$1,
                                                       phone=$2,
                                                       email=$3,
                                                       city=$4,
                                                       street=$5,
                                                       house=$6,
                                                       count_place=$7,
                                                       price=$8,
                                                       free_places=$9,
                                                       description=$10,
                                                       video_monitoring=$11,
                                                       covered_parking=$12,
                                                       underground_parking=$13,
                                                       motorbike=$14,
                                                       car=$15,
                                                       truck=$16 WHERE id=$17`, [name,
                                                                                 phone,
                                                                                 email,
                                                                                 city,
                                                                                 street,
                                                                                 house,
                                                                                 count_place,
                                                                                 price,
                                                                                 free_places,
                                                                                 description,
                                                                                 video_monitoring,
                                                                                 covered_parking,
                                                                                 underground_parking,
                                                                                 motorbike,
                                                                                 car,
                                                                                 truck,
                                                                                 user_id]);
    res.send('OK');
  }
}

module.exports = new ParkingController();