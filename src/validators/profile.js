const validator = require("validator");
const exists = require("../models/auth/exists");
const { throw: throwValidator } = require("./validator");
const symbol = RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)

module.exports = async (request) => {
  const { fullName, phoneNumber } = request;
  if (
    !validator.isEmpty(fullName) &&
    !validator.isEmpty(phoneNumber)
  ) if (
      !validator.contains(fullName, symbol) &&
      !validator.isNumeric(fullName) &&
      validator.isNumeric(phoneNumber)
    ) {
      return throwValidator(true, "Success", {
        full_name: validator.escape(fullName),
        phone_number: validator.escape(phoneNumber)
      });
    } else { return throwValidator(false, "Form need to be valid data") }
  else { return throwValidator(false, "Form need to be filled"); }
}