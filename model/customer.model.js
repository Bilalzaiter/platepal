const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    country: { type: String },
    selectedLocation: { latitude: Number, longitude: Number },
    customerId: { type: Number, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    token: { type: String },
    role: { type: [String], enum: ["admin", "delivery person", "customer", "private seller", "restaurant"], default: ["customer"], },
    ordersDelivered: { type: Number, default: 0 },
    ranking: { type: Number, default: 0 },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number] }
    },
    profilePhoto: {
      type: Object, default: { url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", publicId: null, },
    },

    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "dishes" }],
  },
  {
    timestamps: true,
  }
);

customerSchema.index({ location: '2dsphere' }); 

customerSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    return next(error);
  }
});

customerSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, customerId: this.customerId, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;