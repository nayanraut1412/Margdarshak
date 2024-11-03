// // authMiddleware.js
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const authenticateToken = (req, res, next) => {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateToken;



// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  // console.log('inside the authmiddleware',token);
  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
