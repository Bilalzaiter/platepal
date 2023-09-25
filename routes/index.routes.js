const express = require('express');
const router = express.Router();
const path = require('path')
// Import route handlers

const userController = require('../controller/user.controller');
const geocodeRoutes = require('./geocode.route');
const roleMiddleware = require('../middleware/roleMiddleware')
const roles = require('../utils/roles')
// const dishesRoutes = require('./routes/dishes');
// const restaurantsRoutes = require('./routes/restaurants');
// const passwordRoutes = require('./password.route')

// Define routes

router.use('/geocode', geocodeRoutes); 
// router.use('/dishes', dishesRoutes);
// router.use('/restaurants', restaurantsRoutes);
// router.use('/users', usersRoutes);
// router.use("/password", passwordRoutes)
// Delivery Person CRUD routes with role-based authorization
router.post('/admin', userController.createAdmin);
router.get('/admin', roleMiddleware([roles.ADMIN]), userController.getAllAdmins);
router.get('/admin/:id', roleMiddleware([roles.ADMIN]), userController.getAdminById);
router.put('/admin/:id', roleMiddleware([roles.ADMIN]), userController.updateAdmin);
router.delete('/admin/:id', roleMiddleware([roles.ADMIN]), userController.deleteAdmin);

router.post('/delivery-person', roleMiddleware([roles.ADMIN, roles.DELIVERYPERSON]), userController.createDeliveryPerson);
router.get('/delivery-person', roleMiddleware([roles.ADMIN, roles.DELIVERYPERSON]), userController.getAllDeliveryPersons);
router.get('/delivery-person/:id', roleMiddleware([roles.ADMIN, roles.DELIVERYPERSON]), userController.getDeliveryPersonById);
router.put('/delivery-person/:id', roleMiddleware([roles.ADMIN, roles.DELIVERYPERSON]), userController.updateDeliveryPerson);
router.delete('/delivery-person/:id', roleMiddleware([roles.ADMIN, roles.DELIVERYPERSON]), userController.deleteDeliveryPerson);

router.post('/restaurant', roleMiddleware([roles.ADMIN, roles.RESTAURANT]), userController.createRestaurant);
router.get('/restaurant', roleMiddleware([roles.ADMIN, roles.RESTAURANT]), userController.getAllRestaurants);
router.get('/restaurant/:id', roleMiddleware([roles.ADMIN, roles.RESTAURANT]), userController.getRestaurantById);
router.put('/restaurant/:id', roleMiddleware([roles.ADMIN, roles.RESTAURANT]), userController.updateRestaurant);
router.delete('/restaurant/:id', roleMiddleware([roles.ADMIN, roles.RESTAURANT]), userController.deleteRestaurant);

router.post('/private-seller', roleMiddleware([roles.ADMIN, roles.PRIVATESELLER]), userController.createPrivateSeller);
router.get('/private-seller', roleMiddleware([roles.ADMIN, roles.PRIVATESELLER]), userController.getAllPrivateSellers);
router.get('/private-seller/:id', roleMiddleware([roles.ADMIN, roles.PRIVATESELLER]), userController.getPrivateSellerById);
router.put('/private-seller/:id', roleMiddleware([roles.ADMIN, roles.PRIVATESELLER]), userController.updatePrivateSeller);
router.delete('/private-seller/:id', roleMiddleware([roles.ADMIN, roles.PRIVATESELLER]), userController.deletePrivateSeller);

router.post('/customer', roleMiddleware([roles.ADMIN, roles.CUSTOMER]), userController.createCustomer);
router.get('/customer', roleMiddleware([roles.ADMIN, roles.CUSTOMER]), userController.getAllCustomers);
router.get('/customer/:id', roleMiddleware([roles.ADMIN, roles.CUSTOMER]), userController.getCustomerById);
router.put('/customer/:id', roleMiddleware([roles.ADMIN, roles.CUSTOMER]), userController.updateCustomer);
router.delete('/customer/:id', roleMiddleware([roles.ADMIN, roles.CUSTOMER]), userController.deleteCustomer);

router.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '404.html'))
    } else if (req.accepts('json')) {
      res.json({ message: '404 Not Found' })
    } else {
      res.type('txt').send('404 Not Found')
    }
  })
// Other routes can be added here

module.exports = router;
