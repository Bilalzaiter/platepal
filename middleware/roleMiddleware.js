const jwt = require('jsonwebtoken');
const roles = require('../utils/roles');

function checkUserRole(requiredRoles, callback) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    try {
      const decodedToken = jwt.verify(token, secretKey);
      const userRoles = decodedToken.roles || [];

      // Check if the user has any of the required roles or is a customer
      const hasRequiredRole = requiredRoles.some(role =>
        userRoles.includes(role) || role === roles.CUSTOMER
      );

      if (!hasRequiredRole) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // Execute the callback function if access is granted
      callback(req, res, next);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}

module.exports = checkUserRole;
