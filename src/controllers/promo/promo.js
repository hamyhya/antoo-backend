const getPromos = require("../../models/promo/getPromo");
const response = require("../../utils/response")

module.exports = async (req, res) => {
  try {
    const getUser = await getPromos();
    res.status(200).send(response(true, "List of Promo", getUser))
  }
  catch (e) {
    res.status(500).send(response(false, e.message))
  }
}