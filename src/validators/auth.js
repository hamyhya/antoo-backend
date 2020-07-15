const validator = require("validator");
const exists = require("../models/auth/exists");
const existsOtp = require("../models/auth/existsOTP");
const { throw: throwValidator } = require("./validator");

module.exports = {
  register: async (request) => {
    const { password, confirm_password: cpassword, email } = request;
    if (
      !validator.isEmpty(password) &&
      !validator.isEmpty(cpassword) &&
      !validator.isEmpty(email)
    )
      if (validator.equals(password, cpassword) && validator.isEmail(email)) {
        const existsCheck = await exists({ email: email });
        if (existsCheck) {
          return throwValidator(false, "Email has been taken by another user");
        } else {
          return throwValidator(true, "Success", {
            email: validator.escape(email),
            password: validator.escape(password),
            confirm_password: validator.escape(cpassword),
          });
        }
      } else
        return throwValidator(
          false,
          "Password, Confirm password and email must be valid data"
        );
    else
      return throwValidator(
        false,
        "Password, Confirm password, and email must be required"
      );
  },
  activation: async (request) => {
    const { otp } = request;
    if (!validator.isEmpty(otp)) {
      const existsCheck = await existsOtp(otp, false);
      if (!existsCheck) {
        return throwValidator(false, "Otp is not valid");
      } else {
        return throwValidator(true, "Success", existsCheck);
      }
    } else {
      return throwValidator(false, "Otp is required");
    }
  },
};
