let express = require("express");
let router = express.Router();
let addUser = require("../db");

router.post("/", function (req, res, next) {
  const teamName = req.body.teamName;

  //if (teamName && process.env.TEAM_NAME.indexOf(teamName) >= 0) {
  res.status(200).send({ response: "You are now registered" });
  addUser(teamName);
  //}
  //else
  // res.status(400).send({
  //   response: `${teamName} is not part of the team. Modify your .env`
  //// });
});

module.exports = router;
