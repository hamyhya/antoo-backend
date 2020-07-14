const activation = require("../../models/auth/activation");
const { activation: activationValidator } = require("../../validators/auth");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { otp } = req.body;
  const activationValidatorCheck = await activationValidator({ otp });
  if (activationValidatorCheck.status) {
    const { otp: otpPassed } = activationValidatorCheck.passed;
    try {
      await activation({ otp: otpPassed });
      res
        .status(200)
        .send(response(true, activationValidatorCheck.msg, { otp: otpPassed }));
    } catch (e) {
      res.status(500).send(response(false, acactivationValidatorCheck.msg));
    }
  } else {
    res.status(400).send(response(false, acactivationValidatorCheck.msg));
  }
};
