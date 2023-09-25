const Admin = require('../model/admin.model');
const Customer = require('../model/customer.model');
const PrivateSeller = require('../model/privateSeller.model');
const Restaurant = require('../model/restaurant.model');
const DeliveryPerson = require('../model/deliveryPerson.model');
const roles = require('../utils/roles')
const { logEvents } = require('../services/logger')
// create an admin
exports.createAdmin = async (req, res) => {
  try {
    // Check if an admin user already exists
    const adminExists = await Admin.exists({ role: roles.ADMIN });

    if (adminExists) {
      return res.status(400).json({ message: 'Admin user already exists' });
    }

    // Create the admin user
    const newAdmin = await Admin.create({ ...req.body, role: [roles.ADMIN] });
    logEvents(`Admin created: ${JSON.stringify(newAdmin)}`, 'creation.log');

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const newRestaurant = await Restaurant.create(req.body);
    logEvents(`Restaurant created: ${JSON.stringify(newRestaurant)}` , 'creation.log');
    res.status(201).json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create DeliveryPerson
exports.createDeliveryPerson = async (req, res) => {
  try {
    const newDeliveryPerson = await DeliveryPerson.create(req.body);
    logEvents(`Deliver Person  created: ${JSON.stringify(newDeliveryPerson)}` , 'creation.log');
    res.status(201).json(newDeliveryPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Privateseller
exports.createPrivateSeller = async (req, res) => {
  try {
    const newPrivateseller = await PrivateSeller.create(req.body);
    logEvents(`Private Seller created: ${JSON.stringify(newPrivateseller)}` , 'creation.log');
    res.status(201).json(newPrivateseller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create Customer
exports.createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    logEvents(`Customer created: ${JSON.stringify(newCustomer)}` , 'creation.log');
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all Admins
exports.getAllAdmins = async (req, res) => {
  try {
    // You should define the appropriate model for fetching all users.
    // For example, if you want to fetch all Admins, you would use Admin.find() here.
    const admins = await Admin.find();
    logEvents(`Retrieved all admins: ${JSON.stringify(admins)}`, 'requesting.log');
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific Admin by ID
exports.getAdminById = async (req, res) => {
  try {
    // You should define the appropriate model for fetching a specific user by ID.
    // For example, if you want to fetch a specific Admin by ID, you would use Admin.findById(req.params.id) here.
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }
    logEvents(`Retrieved admin by ID ${req.params.id}: ${JSON.stringify(admin)}`, 'requesting.log');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a Admin's information
exports.updateAdmin = async (req, res) => {
  try {
    // You should define the appropriate model for updating a user's information.
    // For example, if you want to update an Admin's information, you would use Admin.findByIdAndUpdate() here.
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    logEvents(`Admin updated: ${JSON.stringify(updatedAdmin)} is updated`, 'updating.log');

    res.json(updatedAdmin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a Admin
exports.deleteAdmin = async (req, res) => {
  try {
    // You should define the appropriate model for deleting a user.
    // For example, if you want to delete an Admin, you would use Admin.findByIdAndDelete() here.
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    logEvents(`Admin deleted: ${JSON.stringify(deletedAdmin)} is deleted`, 'deleting.log');
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all Restaurants
exports.getAllRestaurants = async (req, res) => {
  try {
    // You should define the appropriate model for fetching all users.
    // For example, if you want to fetch all Admins, you would use Admin.find() here.
    const restaurants = await Restaurant.find();
    logEvents(`Retrieved all restaurants: ${JSON.stringify(restaurants)}`, 'requesting.log');

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific Restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    // You should define the appropriate model for fetching a specific user by ID.
    // For example, if you want to fetch a specific Admin by ID, you would use Admin.findById(req.params.id) here.
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'User not found' });
    }
    logEvents(`Retrieved restaurant by ID ${req.params.id}: ${JSON.stringify(restaurant)}`, 'requesting.log');

    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a Restaurant's information
exports.updateRestaurant = async (req, res) => {
  try {
    // You should define the appropriate model for updating a user's information.
    // For example, if you want to update an Admin's information, you would use Admin.findByIdAndUpdate() here.
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    logEvents(`Restaurant updated: ${JSON.stringify(updatedRestaurant)} is updated`, 'updating.log');

    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a Restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    // You should define the appropriate model for deleting a user.
    // For example, if you want to delete an Admin, you would use Admin.findByIdAndDelete() here.
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    logEvents(`Restaurant deleted: ${JSON.stringify(deletedRestaurant)} is deleted`, 'deleting.log');
    res.json({ message: 'Restaurant deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all PrivateSellers
exports.getAllPrivateSellers = async (req, res) => {
  try {
    const privateSellers = await PrivateSeller.find();
    logEvents(`Retrieved all privateSellers: ${JSON.stringify(privateSellers)}`, 'requesting.log');// should continue
    res.json(privateSellers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific PrivateSeller by ID
exports.getPrivateSellerById = async (req, res) => {
  try {
    const privateSeller = await PrivateSeller.findById(req.params.id);
    if (!privateSeller) {
      return res.status(404).json({ message: 'PrivateSeller not found' });
    }
    logEvents(`Retrieved privateSeller by ID ${req.params.id}: ${JSON.stringify(privateSeller)}`, 'requesting.log');
    res.json(privateSeller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a PrivateSeller's information
exports.updatePrivateSeller = async (req, res) => {
  try {
    const updatedPrivateSeller = await PrivateSeller.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPrivateSeller) {
      return res.status(404).json({ message: 'PrivateSeller not found' });
    }
    logEvents(`PrivateSeller updated: ${JSON.stringify(updatedPrivateSeller)} is updated`, 'updating.log');
    res.json(updatedPrivateSeller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a PrivateSeller
exports.deletePrivateSeller = async (req, res) => {
  try {
    const deletedPrivateSeller = await PrivateSeller.findByIdAndDelete(
      req.params.id
    );
    if (!deletedPrivateSeller) {
      return res.status(404).json({ message: 'PrivateSeller not found' });
    }
    logEvents(`PrivateSeller deleted: ${JSON.stringify(deletedPrivateSeller)} is deleted`, 'deleting.log');
    res.json({ message: 'PrivateSeller deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all DeliveryPersons
exports.getAllDeliveryPersons = async (req, res) => {
  try {
    const deliveryPersons = await DeliveryPerson.find();
    logEvents(`Retrieved all deliveryPersons: ${JSON.stringify(deliveryPersons)}`, 'requesting.log');// should continue
    res.json(deliveryPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific DeliveryPerson by ID
exports.getDeliveryPersonById = async (req, res) => {
  try {
    const deliveryPerson = await DeliveryPerson.findById(req.params.id);
    if (!deliveryPerson) {
      return res.status(404).json({ message: 'DeliveryPerson not found' });
    }
    logEvents(`Retrieved deliveryPerson by ID ${req.params.id}: ${JSON.stringify(deliveryPerson)}`, 'requesting.log');
    res.json(deliveryPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a DeliveryPerson's information
exports.updateDeliveryPerson = async (req, res) => {
  try {
    const updatedDeliveryPerson = await DeliveryPerson.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDeliveryPerson) {
      return res.status(404).json({ message: 'DeliveryPerson not found' });
    }
    logEvents(`DeliveryPerson updated: ${JSON.stringify(updatedDeliveryPerson)} is updated`, 'updating.log');
    res.json(updatedDeliveryPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a DeliveryPerson
exports.deleteDeliveryPerson = async (req, res) => {
  try {
    const deletedDeliveryPerson = await DeliveryPerson.findByIdAndDelete(
      req.params.id
    );
    if (!deletedDeliveryPerson) {
      return res.status(404).json({ message: 'DeliveryPerson not found' });
    }
    logEvents(`DeliveryPerson deleted: ${JSON.stringify(deletedDeliveryPerson)} is deleted`, 'deleting.log');
    res.json({ message: 'DeliveryPerson deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    logEvents(`Retrieved all Customers: ${JSON.stringify(customers)}`, 'requesting.log');// should continue
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific DeliveryPerson by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    logEvents(`Retrieved Customer by ID ${req.params.id}: ${JSON.stringify(customer)}`, 'requesting.log');
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a Customer's information
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    logEvents(`Customer updated: ${JSON.stringify(updatedCustomer)} is updated`, 'updating.log');
    res.json(updatedCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    logEvents(`Customer deleted: ${JSON.stringify(deletedCustomer)} is deleted`, 'deleting.log');
    res.json({ message: 'Customer deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};