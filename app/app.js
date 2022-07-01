const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const makeDbConnection = require("../db/connection.mongodb");
const path = require("path");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//connect to database

makeDbConnection();
require("../db/models/Brand.mode");
require("../db/models/Category.model");
//application routes
app.use(
  "/uploads/product_images/",
  express.static(path.join(__dirname, "../uploads", "product_images"))
);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "This is Seller Application",
  });
});

app.use("/api/seller", require("../routes/authRoutes.seller"));
app.use("/api/product", require("../routes/productRoutes.seller"));

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

module.exports = app;
