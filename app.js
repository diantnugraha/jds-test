if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const errorHandle = require("./middlewares/errorHandler");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routes = require("./routes");

app.use("/", routes);
app.use(errorHandle);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
