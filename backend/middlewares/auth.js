const jwt = require('jsonwebtoken');
const SECRET = 'S3CR3T';

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Unauthorized access.' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Authentication token not found.' });
  }
};

module.exports = {
  authenticateJwt,
  SECRET
};