const Product = require("../db/models/Product.model");
const { removeFile } = require("../lib/FileUploader");
const { PRODUCT_IMAGE_DIR } = require("../lib/FileUploadDir");
const uploadNewProduct = async (req, res, next) => {
  try {
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

    let productImages = [];
    const url = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${PRODUCT_IMAGE_DIR}/`;
    //set product images
    req.files.forEach((file) => {
      const fileName = file?.filename + ".webp";
      productImages.push({
        image: {
          fileName: fileName,
          uri: url + fileName,
        },
      });
    });

    let arrayOfColor = [];
    JSON.parse(colors)?.forEach((color) => {
      arrayOfColor.push(color);
    });
    let arrayOfSize = [];
    JSON.parse(size)?.forEach((sz) => {
      arrayOfSize.push(sz);
    });

    const newProduct = new Product({
      title,
      description,
      productImages,
      seller: req.sellerId,
      category,
      brand,
      colors: arrayOfColor,
      size: arrayOfSize,
      stock,
      offer: {
        enable: offerEnable,
        percent: offerParcent,
      },
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      message: "Product Upload Successful.",
    });
  } catch (error) {
    req.files.forEach(async (file) => {
      await removeFile(PRODUCT_IMAGE_DIR, file.filename + ".webp");
    });
    res.status(200).json({
      message: "Server Error Found.",
      error,
    });
  }
};
const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ active: true })
      .populate("seller", {
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        _id: 1,
      })
      .populate("category", { name: 1, description: 1 })
      .populate("brand", { name: 1, description: 1 });

    res.status(201).json({ products });
  } catch (err) {
    res.status(404).json({
      message: "Server Error Found.",
      err,
    });
  }
};
const getSellerProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ active: true, seller: req.sellerId })
      .populate("seller", {
        firstName: 1,
        lastName: 1,
        email: 1,
        phone: 1,
        _id: 1,
      })
      .populate("category", { name: 1, description: 1 })
      .populate("brand", { name: 1, description: 1 });

    res.status(201).json({ products });
  } catch (err) {
    res.status(404).json({
      message: "Server Error Found.",
      err,
    });
  }
};
const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  const sellerId = req.sellerId;

  const product = await Product.findOne({ _id: productId });
  if (product?.seller.toString() === sellerId) {
    product?.productImages?.forEach(async (pImg) => {
      await removeFile(PRODUCT_IMAGE_DIR, pImg?.image?.fileName);
    });
    const deleteProduct = await Product.findOneAndDelete({ _id: productId });
    res.status(201).json({
      message: "Product Deleted Successful.",
    });
  } else {
    res.status(200).json({
      message: "You Don't Have Any Permission to Delete This Product.",
    });
  }
};

module.exports = {
  uploadNewProduct,
  getAllProduct,
  deleteProduct,
  getSellerProduct,
};
