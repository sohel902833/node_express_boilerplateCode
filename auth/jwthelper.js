const jwt = require("jsonwebtoken");

const generateNewToken = (user) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      { user: user },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: 86400000,
      }
    );

    resolve(`Bearer ${token}`);
  });
};

const generateRefreshToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = { user };
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const options = { expiresIn: "1y" };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err);
      resolve(`Bearer ${token}`);
    });
  });
};

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resoleve, reject) => {
    if (!refreshToken) return reject("Refresh Token Not Found.");
    jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) return reject("Invalid Token");
      const user = payload.user;
      resoleve(user);
    });
  });
};

module.exports = {
  generateNewToken,
  generateRefreshToken,
  verifyRefreshToken,
};
