const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();
const { APP_PORT } = process.env;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static("public"));

app.use("/auth", require("./src/routes/auth"));
app.use("/transaction", require("./src/routes/transaction"));
app.use("/profile", require("./src/routes/profile"));
app.use("/user", require("./src/routes/user"));

app.listen(APP_PORT, (err) => {
  if (err) {
    throw err;
  }
});
