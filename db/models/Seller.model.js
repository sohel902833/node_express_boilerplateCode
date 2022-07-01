const mongoose = require("mongoose");
const { SELLER_MODEL_NAME } = require("./model.names");

const Schema = mongoose.Schema;

const sellerSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    middleName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      fileName: {
        type: String,
        default: "none",
      },
      uri: {
        type: String,
        default: "none",
      },
    },
    role: {
      type: String,
      enum: ["seller", "admin"],
      default: "seller",
    },
    balance: {
      type: Number,
      default: 0,
    },
    emailVarified: {
      type: Boolean,
      default: false,
    },
    phoneVarified: {
      type: Boolean,
      default: false,
    },
    adminVerified: {
      type: Boolean,
      default: false,
    },
    balanceDue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model(SELLER_MODEL_NAME, sellerSchema);

module.exports = Seller;
