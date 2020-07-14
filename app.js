const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

const { APP_PORT } = process.env;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static("public"));

app.listen(APP_PORT, (err) => {
  if (err) {
    throw err;
  }
});
