const Router = require('express');
const router = new Router();
const userController = require('../controller/user.controller');

router.post('/createUser', userController.createUser);

module.exports = router;