const router = require("express").Router();
const sellerAuthController = require("../controller/authController.seller");
const sellerInputValidator = require("../validators/seller.validators");
router.post(
  "/signup",
  sellerInputValidator.validateSellerSignupData,
  sellerAuthController.registerSeller
);
router.post("/login", sellerAuthController.loginSeller);

module.exports = router;
