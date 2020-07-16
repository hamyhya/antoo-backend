const router = require("express").Router();
const register = require("../controllers/auth/register");
const activation = require("../controllers/auth/activation");
const login = require("../controllers/auth/login");

router.post("/register", register);
router.patch("/activation", activation);
router.post("/login", login);
// router.patch("/forgot", forgot);

module.exports = router;
