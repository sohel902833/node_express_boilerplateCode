const dotenv = require("dotenv");

dotenv.config();
const app = require("./app/app");

//run the application
const port = process.env.PORT;
const APPLICATION_NAME = process.env.APPLICATION_NAME;
app.listen(port, () => {
  console.log(`${APPLICATION_NAME} Is Listening on port ${port}`);
});
