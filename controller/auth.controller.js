// controllers/auth.controller.js
const roles = require('../utils/roles');

module.exports = {
  adminRoute: (req, res) => {
    res.json({ message: 'Admin access granted' });
  },
  restaurantRoute: (req, res) => {
    res.json({ message: 'Restaurant access granted' });
  },
  privateSellerRoute: (req, res) => {
    res.json({ message: 'Private seller access granted' });
  },
  customerRoute: (req, res) => {
    res.json({ message: 'Customer access granted' });
  },
  deliveryPersonRoute: (req, res) => {
    res.json({ message: 'Delivery Person access granted' });
  }
};
