let express = require("express");
let router = express.Router();
let addUser = require("../db")

router.post("/", (req, res, next) => {
  res.status(200).send(req.body);
  console.log("user data", req.body);
  //save user into database
  addUser(req.body.name, req.body.email)
});

module.exports = router;
