const mongoose = require("mongoose");
const { CATEGORY_MODEL_NAME } = require("./model.names");

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model(CATEGORY_MODEL_NAME, categorySchema);

module.exports = Category;
