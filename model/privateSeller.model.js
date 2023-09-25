const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const privateSellerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
    nationality: { type: String },
    country: { type: String },
    selectedLocation: { latitude: Number, longitude: Number },
    privateSellerId: { type: Number, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    token: { type: String },
    role: { type: [String], enum: ["admin", "delivery person", "customer", "private seller", "restaurant"], default: ["private seller"], },
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

privateSellerSchema.index({ location: '2dsphere' }); 

privateSellerSchema.pre("save", async function (next) {
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

privateSellerSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, privateSellerId: this.privateSellerId, role: this.role },
    process.env.JWT_SECRET_KEY
  );
};

const PrivateSeller = mongoose.model("PrivateSeller", privateSellerSchema);

module.exports = PrivateSeller;