const router = require("express").Router();
const routerUser = require("../routes/routerUser");
const routerDataCustomer = require("./routerDataCustomer");

router.get("/", (req, res) => {
  res.send("Welcome to JDS Test");
});

router.use("/users", routerUser);
router.use("/customer", routerDataCustomer);
module.exports = router;
