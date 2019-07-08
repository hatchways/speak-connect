var express = require("express");
var router = express.Router();

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Welcome to the server..." });
});

module.exports = router;
