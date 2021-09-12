const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
  async login(req, res) {
    const {phone, password} = req.body;
    const user = await db.query('SELECT person.id, person.phone, person.role, person.password FROM person WHERE person.phone=$1 UNION SELECT parking.id, parking.phone, parking.role, parking.password FROM parking WHERE parking.phone=$1', [phone]);

    if(!user.rows[0]) {
      return res.status(400).json({message: 'Такого пользователя нет'});
    }

    const is_match = await bcrypt.compare(password, user.rows[0].password);
    if(!is_match) {
      return res.status(400).json({message: 'Неверный пароль'});
    }
    const token = jwt.sign(
      {user_id: user.rows[0].id, user_role: user.rows[0].role},
      'jwt_secret_key',
      {expiresIn: 2419200}  // 1 месяц в секундах
    );

    res.cookie('token', token, {
      maxAge: 2419200, // 1 месяц в секундах
      secure: false, // set to true if your using https
      httpOnly: true
    }).json({role: user.rows[0].role});
  };

  async isAuth(req, res) {
    const token = req.cookies?.token || '';
    if(!token) {
      res.status(401).json({message: 'Пользователь не авторизован'});
    }
    res.status(200).send();
  };

  async logout(req, res) {
    res.clearCookie('token').send();
  };

  async resetPass(req, res) {
    // const {phone, password} = req.body;
    // const user = await db.query('SELECT * FROM person WHERE phone=$1', [phone]);
    //
    // if(!user.rows[0]) {
    //   return res.status(400).json({message: 'Такого пользователя нет'});
    // }
    //
    //
  };

}

module.exports = new AuthController();