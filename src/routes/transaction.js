const router = require("express").Router();
const topUpController = require("../controllers/transaction/topUp");

const needLogin = require("../middlewares/needLogin");

router.post("/top-up", needLogin, topUpController);

module.exports = router;
