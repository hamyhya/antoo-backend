module.exports = {
  throw: (status, msg = "", passed = {}) => ({
    status,
    msg,
    passed,
  }),
};
