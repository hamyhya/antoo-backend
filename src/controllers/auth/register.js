const register = require("../../models/auth/register");
const authValidator = require("../../validators/auth");
const response = require("../../utils/response");
const emailSender = require("../../utils/emailSender");
const OTPGenerator = require("../../utils/OTPGenerator");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { email } = req.body;

  const registerValidator = authValidator.register(req.body);
  if (registerValidator.status) {
    const {
      email: emailPassed,
      password: passwordPassed,
    } = registerValidator.passed;
    try {
      const template = await fs.readFileSync(
        path.join(__dirname, "../../templates/email.html"),
        "utf-8"
      );
      const code = await OTPGenerator(4);
      const registeredUser = await register({
        email: emailPassed,
        password: bcrypt.hashSync(passwordPassed, 12),
        otp: code,
      });
      emailSender({
        to: email,
        subject: "Hello, i'm from antoo e-wallet",
        html: mustache.render(template, {
          email,
          code,
        }),
      }).then(() => {
        res
          .status(200)
          .send(response(true, registerValidator.msg, registeredUser));
      });
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, registerValidator.msg));
  }
};
