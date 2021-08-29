const Router = require('express');
const router = new Router();
const parkingController = require('../controller/parking.controller');

router.post('/createParking', parkingController.createParking);
router.get('/getParking', parkingController.getParking);
router.get('/getParking/:id', parkingController.getOneParking);
router.post('/updateParking', parkingController.updateParking);

module.exports = router;