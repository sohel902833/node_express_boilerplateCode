const dotenv = require("dotenv");
const app = require("./app/app");
dotenv.config();

//run the application
const port = process.env.PORT;
const APPLICATION_NAME = process.env.APPLICATION_NAME;
app.listen(port, () => {
  console.log(`${APPLICATION_NAME} Is Listening on port ${port}`);
});
