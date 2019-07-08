let express = require("express");
let router = express.Router();
let addUser = require("../db");

router.post("/", function (req, res, next) {
  const teamName = req.body.teamName;

  res.status(200).send({ response: "You are now registered" });
  //addUser(teamName);

});

module.exports = router;
