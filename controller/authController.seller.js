const Seller = require("../db/models/Seller.model");
const { generateNewToken, generateRefreshToken } = require("../auth/jwthelper");
const bcrypt = require("bcrypt");

const registerSeller = async (req, res, next) => {
  try {
    const { firstName, middleName, lastName, email, password, phone } =
      req.body;

    const prevUser = await Seller.findOne({ email: email });

    if (prevUser) {
      res.status(200).json({
        message: "User Alredy Exists",
        errors: {
          email: "Email Already Exists",
        },
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      //prev user is not found.
      const newSeller = new Seller({
        firstName,
        middleName,
        lastName,
        email,
        password: hashedPassword,
        phone,
      });

      const savedNewSeller = await newSeller.save();

      const seller = {
        firstName: savedNewSeller?.firstName,
        middleName: savedNewSeller?.middleName,
        lastName: savedNewSeller?.lastName,
        email: savedNewSeller?.email,
        phone: savedNewSeller?.phone,
        role: savedNewSeller?.role,
        _id: savedNewSeller?._id,
      };

      const accessToken = await generateNewToken(seller);
      const refreshToken = await generateRefreshToken(seller);

      res.status(201).json({
        message: "Seller Registration Successful.",
        user: seller,
        auth: {
          accessToken,
          refreshToken,
        },
      });
    }
  } catch (err) {
    res.status(200).json({
      message: "Server Error Found.",
    });
  }
};

const loginSeller = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({
        message: "Send Email And Password for Login",
      });
    } else {
      const savedSeller = await Seller.findOne({ email });
      if (savedSeller) {
        const isValidPassword = await bcrypt.compare(
          password,
          savedSeller?.password
        );
        if (isValidPassword) {
          const seller = {
            firstName: savedSeller?.firstName,
            middleName: savedSeller?.middleName,
            lastName: savedSeller?.lastName,
            email: savedSeller?.email,
            phone: savedSeller?.phone,
            role: savedSeller?.role,
            _id: savedSeller?._id,
          };

          const accessToken = await generateNewToken(seller);
          const refreshToken = await generateRefreshToken(seller);

          res.status(201).json({
            message: "Seller Login Successful.",
            user: seller,
            auth: {
              accessToken,
              refreshToken,
            },
          });
        } else {
          //password does n't matched.
          res.status(200).json({
            message: "Password Doesn't Matched.",
          });
        }
      } else {
        res.status(200).json({
          message: "User Not Found.",
        });
      }
    }
  } catch (error) {
    res.status(200).json({
      message: "Server Error Found.",
    });
  }
};

const verifySelller = async (req, res, next) => {
  try {
    const sellerId = req.sellerId;

    const seller = await Seller.findOne({ _id: sellerId });

    if (seller) {
      if (seller?.adminVerified) {
        next();
      } else {
        res.status(200).json({
          message: "Your Account Is Not Active.",
        });
      }
    } else {
      res.status(200).json({
        message: "Seller not found.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Server Error Found.",
    });
  }
};

module.exports = {
  registerSeller,
  loginSeller,
  verifySelller,
};
