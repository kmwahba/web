const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

async function generateToken(user) {
  const payload = {
    role: user.role,
    username: user.username,
  };
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  return token;
}

function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = {
  generateToken,
  authenticateToken,
};
