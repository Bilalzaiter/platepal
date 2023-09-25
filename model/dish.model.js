const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  privateSeller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'private seller'
  },
  cuisine: {
    type: String,
    enum: ['Italian', 'Chinese', 'Indian', 'Mexican', 'Lebanese', 'Syrian', 'marocan'] // Example cuisines
  },
  isDeliveryAvailable: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  accumulatedOrderCount: {
    type: Number,
    default: 0
  },
  deliveryPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPerson'
  }
});

// Add indexes if needed
dishSchema.index({ price: 1 });
dishSchema.index({ cuisine: 1 });
dishSchema.index({ accumulatedOrderCount: -1 });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
