const Router = require('express');
const router = new Router();
const reservationController = require('../controller/reservation.controller');

router.post('/createReservation', reservationController.createReservation);
router.get('/getReservation', reservationController.getReservation);

module.exports = router;