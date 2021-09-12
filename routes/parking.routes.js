const Router = require('express');
const router = new Router();
const auth = require('../middleware/auth');
const parkingController = require('../controller/parking.controller');

router.post('/createParking', parkingController.createParking);
router.get('/getParking', auth, parkingController.getParking);
router.get('/getFavorite', auth, parkingController.getFavorite);
router.post('/addFavorite', auth, parkingController.addFavorite);
router.post('/removeFavorite', auth, parkingController.removeFavorite);
router.get('/getParking/:id', auth, parkingController.getOneParking);
router.get('/getParkingSettings', auth, parkingController.getParkingSettings);
router.post('/updateParkingSettings', auth, parkingController.updateParkingSettings);

module.exports = router;