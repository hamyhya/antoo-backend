const validator = require("validator");
const { throw: throwValidator } = require("./validator");

module.exports = async (request) => {
  const { title, description: desc } = request
  if (!validator.isEmpty(title) && !validator.isEmpty(desc)) {
    return throwValidator(true, "Success", {
      title: validator.escape(title),
      description: validator.escape(desc)
    })
  }
  else { return throwValidator(false, "Form need to be filled"); }
}