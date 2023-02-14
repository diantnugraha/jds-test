const ControllerUser = require("../controllers/controllerUser");
const router = require("express").Router();

router.post("/register", ControllerUser.registerUser);
router.post("/login", ControllerUser.loginUser);
router.get("/profile", ControllerUser.profileUser);

module.exports = router;
