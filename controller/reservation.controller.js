const db = require('../db');

class ReservationController {
  async createReservation(req, res) {
    const {date_start, date_end, user_id, parking_id} = req.body;
    const reservation = await db.query('INSERT INTO reservation (date_start, date_end, user_id, parking_id) VALUES ($1, $2, $3, $4) RETURNING *', [date_start, date_end, user_id, parking_id]);
    res.json(reservation.rows[0]);
  }

  async getReservation(req, res) {
    // const {} = req.body;
    const reservation = await db.query('SELECT * FROM reservation INNER JOIN parking ON reservation.parking_id=parking.id');  //бронированные парковки плюс инфа самой парковки
    res.json(reservation.rows);
  }
}

module.exports = new ReservationController();