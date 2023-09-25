const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    items: [String],
    deliveryAddress: String,
    status: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    deliveryPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DeliveryPerson'
    }
  });
  
  const Order = mongoose.model('Order', orderSchema);

  module.exports = Order;
  