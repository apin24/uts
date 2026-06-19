const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia_super_aman_123';

module.exports = function(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.replace('Bearer ', '');

  // Verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // contains id, role, name
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
