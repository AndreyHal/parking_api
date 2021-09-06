const Router = require('express');
const router = new Router();
const AuthController = require('../controller/auth.controller');

router.post('/login', AuthController.login);
router.get('/isAuth', AuthController.isAuth);
router.get('/logout', AuthController.logout);
router.post('/resetPass', AuthController.resetPass);

module.exports = router;