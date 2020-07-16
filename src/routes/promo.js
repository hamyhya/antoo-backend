const router = require("express").Router()
const getPromo = require("../controllers/promo/promo")

const needLogin = require("../middlewares/needLogin");

router.get("/", needLogin, getPromo);

module.exports = router;