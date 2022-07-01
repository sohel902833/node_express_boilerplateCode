const mongoose = require("mongoose");
const makeDbConnection = async () => {
  const dbUrl = process.env.MONGO_CONNECTION_STRING;
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));
};

module.exports = makeDbConnection;
