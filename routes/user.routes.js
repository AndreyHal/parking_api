const Router = require('express');
const router = new Router();
const auth = require('../middleware/auth');
const userController = require('../controller/user.controller');

router.post('/createUser', userController.createUser);
router.get('/getUserSettings', auth, userController.getUserSettings);
router.post('/updateUserSettings', auth, userController.updateUserSettings);

module.exports = router;