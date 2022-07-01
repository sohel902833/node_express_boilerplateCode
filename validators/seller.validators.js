const __ = require("lodash");

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateSellerSignupData = async (req, res, next) => {
  try {
    const { firstName, middleName, lastName, email, password, phone } =
      req.body;

    let errors = {};
    if (!firstName) {
      errors.firstName = "Enter Your First Name.";
    }
    if (!middleName) {
      errors.middleName = "Enter Your Middle Name";
    }
    if (!lastName) {
      errors.lastName = "Enter Your Last Name";
    }
    if (!email) {
      errors.email = "Enter Your Email Address";
    }
    if (!password) {
      errors.password = "Enter Your Password";
    }
    if (!phone) {
      errors.phone = "Enter Your Phone Number";
    }

    if (email && !email.match(emailRegExp)) {
      errors.email = "Invalid Email Address";
    }
    if (password && !password.match(passwordRegExp)) {
      errors.password =
        "Password not valid, must have atleast 6 characters containing 1 upercase, 1 lowercase, 1 special symbol and 1 number.";
    }
    if (__.isEmpty(errors)) {
      next();
    } else {
      res.status(200).json({
        message: "Invalid Field Found.",
        errors,
      });
    }
  } catch (error) {
    res.status(200).json({
      message: "Server Error Found.",
    });
  }
};

module.exports = {
  validateSellerSignupData,
};
