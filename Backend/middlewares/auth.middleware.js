const jwt = require('jsonwebtoken');
const { secret } = require('../config/config'); // Replace with your secret key

const authMiddleware = (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {


    // Verify and decode the token
    const decoded = jwt.verify(token, secret);

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Move to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
