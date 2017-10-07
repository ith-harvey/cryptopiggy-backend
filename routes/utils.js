const jwt = require('jsonwebtoken');
require('dotenv').config()

function generateToken(user) {
  let u = {
   id: user.id.toString(),
   username: user.username,
  };
  return token = jwt.sign(u, process.env.JWT_SECRET, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}


module.exports = {
  generateToken
}
