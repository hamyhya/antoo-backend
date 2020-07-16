const router = require("express").Router();
const topUpController = require("../controllers/transaction/topUp");
const transferController = require("../controllers/transaction/transfer");
const historyController = require("../controllers/transaction/history");

const needLogin = require("../middlewares/needLogin");

router.post("/top-up", needLogin, topUpController);
router.post("/transfer", needLogin, transferController);
router.get("/history", needLogin, historyController);

module.exports = router;
