const router = require("express").Router();
const topUpController = require("../controllers/transaction/topUp");
const transferController = require("../controllers/transaction/transfer");

const needLogin = require("../middlewares/needLogin");

router.post("/top-up", needLogin, topUpController);
router.post("/transfer", needLogin, transferController);

module.exports = router;
