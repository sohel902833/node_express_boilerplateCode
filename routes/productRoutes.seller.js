const router = require("express").Router();
const sellerAuthGard = require("../auth/sellerAuthGard");
const { uploadProductImage, compressImage } = require("../lib/FileUploader");
const { PRODUCT_IMAGE_DIR } = require("../lib/FileUploadDir");
const productController = require("../controller/productController.seller");
const sellerController = require("../controller/authController.seller");
const { validateProduct } = require("../validators/ProductValidators.seller");

router.post(
  "/",
  sellerAuthGard,
  sellerController.verifySelller,
  uploadProductImage(6, "images"),
  compressImage(PRODUCT_IMAGE_DIR, false, true),
  validateProduct,
  productController.uploadNewProduct
);
router.get("/", productController.getAllProduct);
router.get(
  "/seller-product",
  sellerAuthGard,
  productController.getSellerProduct
);
router.delete("/:productId", sellerAuthGard, productController.deleteProduct);
module.exports = router;
