const jwt = require("jsonwebtoken");
const authGard = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    try {
      const token = authorization.split(" ")[1];
      if (token != "none") {
        jwt.verify(
          token,
          process.env.JWT_ACCESS_TOKEN_SECRET,
          (err, payload) => {
            if (err) {
              res
                .status(500)
                .json({ message: "Authentication Failure", errorFor: "auth" });
            } else {
              req.sellerId = payload?.user?._id;
              next();
            }
          }
        );
      } else {
        res
          .status(500)
          .json({ message: "Authentication Failure", errorFor: "auth" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: "Authentication Failure", errorFor: "auth" });
    }
  } else {
    res
      .status(500)
      .json({ message: "Authentication Failure", errorFor: "auth" });
  }
};

module.exports = authGard;
