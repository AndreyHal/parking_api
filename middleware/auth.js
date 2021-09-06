const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }

  const token = req.cookies?.token || '';
  if(!token) {
    res.status(401).json({message: 'Пользователь не авторизован'});
  }
  const decoded = jwt.verify(token, 'jwt_secret_key');
  req.id = decoded.id;
  req.role = decoded.role;
  next();
};