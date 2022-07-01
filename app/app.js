const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//connect to database

//application routes

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "This is Seller Application",
  });
});

// app.use("/api/seller", require("../routes/authRoutes.seller"));

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.use(errorHandler);

module.exports = app;
