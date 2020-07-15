const validator = require("validator");
const { throw: throwValidator } = require("./validator");

module.exports = {
  topup: (request) => {
    const { amount, user_id } = request;
    if (!validator.isEmpty(amount) && !validator.isEmpty(user_id)) {
      if (Number.isInteger(parseInt(amount))) {
        if (amount > 0) {
          return throwValidator(true, "Success", {
            amount: validator.toInt(amount),
            user_id: validator.toInt(user_id),
          });
        } else {
          return throwValidator(false, "Amount is more than 0", request);
        }
      } else {
        return throwValidator(false, "Amount must be integer", request);
      }
    } else {
      return throwValidator(
        false,
        "User id, type id, and amount must be required"
      );
    }
  },
};
