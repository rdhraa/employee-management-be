// middlewares/authMiddleware.js (admin check)
const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid Token' });
    }

    req.user = user;
    next();
  });
};

const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin access required' });
  }
  next();
};

module.exports = { authenticateJWT, checkAdmin };
