const mongoose = require("mongoose");
const { BRAND_MODEL_NAME } = require("./model.names");

const Schema = mongoose.Schema;

const brandSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
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
  {
    timestamps: true,
  }
);

const Brand = mongoose.model(BRAND_MODEL_NAME, brandSchema);

module.exports = Brand;
