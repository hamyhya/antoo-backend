const router = require("express").Router();
const register = require("../controllers/auth/register");
const activation = require("../controllers/auth/activation");

router.post("/register", register);
router.patch("/activation", activation);

module.exports = router;
