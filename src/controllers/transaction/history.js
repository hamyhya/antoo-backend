const historyModel = require("../../models/transaction/history");
const response = require("../../utils/response");

module.exports = async (req, res) => {
  const { id: user_id } = req.me;
  const query = req.query;

  query.type_id = query.type_id || "";

  try {
    const result = await historyModel({ user_id, type_id: query.type_id });
    res.status(200).send(response(true, "List history", result));
  } catch (e) {
    res
      .status(500)
      .send(
        response(false, "Failed to get list history [Internal error server]")
      );
  }
};
