const router = require("express").Router()
const user = require("../controllers/user/user")

router.get("/", user.getAllUsers);
router.get("/:id", user.getUserById);

module.exports = router;