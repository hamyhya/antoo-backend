const router = require("express").Router()
const profile = require("../controllers/profile/profile")

const needLogin = require("../middlewares/needLogin");

router.post("/", needLogin, profile.createProfile);
router.patch("/:id", needLogin, profile.updateProfile);
// router.delete("/:id", profile.deleteProfile);

module.exports = router