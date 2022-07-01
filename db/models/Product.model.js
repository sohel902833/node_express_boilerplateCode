const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  SELLER_MODEL_NAME,
  CATEGORY_MODEL_NAME,
  BRAND_MODEL_NAME,
  PRODUCT_MODEL_NAME,
  USER_MODEL_NAME,
} = require("./model.names");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productImages: [
      {
        image: {
          fileName: {
            type: String,
            default: "none",
          },
          uri: {
            type: String,
            default: "none",
          },
        },
      },
    ],
    seller: {
      type: mongoose.Types.ObjectId,
      ref: SELLER_MODEL_NAME,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: CATEGORY_MODEL_NAME,
      required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: BRAND_MODEL_NAME,
    },
    colors: [
      {
        type: String,
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    offer: {
      enable: {
        type: Boolean,
        required: true,
        default: false,
      },
      percent: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: USER_MODEL_NAME,
        },
        comment: String,
        review: {
          type: Number,
          required: true,
          default: 3,
        },
      },
    ],
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model(PRODUCT_MODEL_NAME, productSchema);
module.exports = Product;
