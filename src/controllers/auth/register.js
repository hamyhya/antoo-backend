const register = require("../../models/auth/register");
const deleteUser = require("../../models/auth/deleteUser");
const authValidator = require("../../validators/auth");
const response = require("../../utils/response");
const emailSender = require("../../utils/emailSender");
const OTPGenerator = require("../../utils/OTPGenerator");
const mustache = require("mustache");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const registerValidator = await authValidator.register(req.body);
  if (registerValidator.status) {
    const { email, password } = registerValidator.passed;
    try {
      const template = await fs.readFileSync(
        path.join(__dirname, "../../templates/email.html"),
        "utf-8"
      );
      const code = await OTPGenerator(4);
      const registeredUser = await register({
        email,
        password: bcrypt.hashSync(password, 12),
        otp: code,
      });
      emailSender({
        to: email,
        subject: "Hello, i'm from antoo e-wallet",
        html: mustache.render(template, {
          email,
          code,
        }),
      })
        .then(() => {
          delete registeredUser.password;
          res
            .status(201)
            .send(response(true, registerValidator.msg, registeredUser));
        })
        .catch(() => {
          deleteUser({ id: registeredUser.id });
          res
            .status(500)
            .send(response(false, "Error email server", registeredUser));
        });
    } catch (e) {
      res.status(500).send(response(false, e.message));
    }
  } else {
    res.status(400).send(response(false, registerValidator.msg));
  }
};
