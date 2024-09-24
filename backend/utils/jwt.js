const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: '30d' });
};