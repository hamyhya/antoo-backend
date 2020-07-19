const response = require("../utils/response");
const jsonWebToken = require("jsonwebtoken");

require("dotenv").config();
module.exports = (req, res, next) => {
  const { APP_KEY } = process.env;

  try {
    let authorization = req
      .header("Authorization")
      .replace(/Bearer|bearer/g, "")
      .trim();
    const me = jsonWebToken.verify(
      authorization || req.query._token || req.body._token,
      APP_KEY
    );
    req.me = me;
    next();
  } catch (e) {
    res.status(403).send(response(false, "This action need token", req.body));
  }
};
