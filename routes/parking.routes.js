const Router = require('express');
const router = new Router();
const parkingController = require('../controller/parking.controller');

router.post('/createParking', parkingController.createParking);

module.exports = router;