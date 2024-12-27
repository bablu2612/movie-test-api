const jwt = require('jsonwebtoken');

// Middleware to check if the user is logged in
const isAuthenticated = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'bablu-kumar-2612');  
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
};

module.exports = isAuthenticated;
