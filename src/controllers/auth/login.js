require("dotenv").config();
const jwt = require("jsonwebtoken");
const response = require("../../utils/response");
const authValidator = require("../../validators/auth");

const { APP_KEY } = process.env;

module.exports = async (req, res) => {
  const loginValidator = await authValidator.login(req.body);
  if (loginValidator.status) {
    const { id, email, password } = loginValidator.passed;
    try {
      const loggedInUser = {
        id,
        email,
        password,
        token: jwt.sign(req.body, APP_KEY),
      };
      res.status(200).send(response(true, loginValidator.msg, loggedInUser));
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, loginValidator.msg));
  }
};
