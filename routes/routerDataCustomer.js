const ControllerData = require("../controllers/controllerData");
const { authenticationUser } = require("../middlewares/authentificationUser");
const router = require("express").Router();

router.get("/data", authenticationUser, ControllerData.getDataRoleUser);

module.exports = router;
