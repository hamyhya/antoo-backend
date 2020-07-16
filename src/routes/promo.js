const router = require("express").Router()
const getPromo = require("../controllers/promo/promo")

router.get("/", getPromo);

module.exports = router;