const testingRouter = require("express").Router();

testingRouter.get("/", (req, res) => {
  res.send("<h1>TEST SUCCESSFUL</h1>");
});

module.exports = testingRouter;
