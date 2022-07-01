const __ = require("lodash");
const { removeFile } = require("../lib/FileUploader");
const { PRODUCT_IMAGE_DIR } = require("../lib/FileUploadDir");
const Product = require("../db/models/Product.model");

const validateProduct = async (req, res, next) => {
  const {
    title,
    description,
    category,
    brand,
    colors,
    size,
    stock,
    offerEnable,
    offerParcent,
  } = req.body;
  let errors = {};

  if (!title) {
    errors.title = "Enter Product Title";
  }
  if (!description) {
    errors.description = "Enter Product Description";
  }
  if (!category) {
    errors.category = "Enter Product Category";
  }
  if (!brand) {
    errors.brand = "Enter Product Brand.";
  }
  if (!colors) {
    errors.colors = "Enter Product Colors.";
  }
  if (!size) {
    errors.size = "Enter Product Sizes.";
  }
  if (!stock) {
    errors.stock = "Enter Stock Size For This Product.";
  }

  if (__.isEmpty(errors)) {
    next();
  } else {
    req.files.forEach(async (file) => {
      await removeFile(PRODUCT_IMAGE_DIR, file.filename + ".webp");
    });

    res.status(200).json({
      message: "Invalid Data Found.",
      errors,
    });
  }
};

module.exports = {
  validateProduct,
};
