const express = require("express");
const router = express.Router();
const addUser = require("../db");
const validate = require("../validate/validateNew");
const Users = require("../models/userModel");
const hash = require("../hash");
const authorize = require("../authorize");
const _ = require("lodash");

router.post("/", async (req, res, next) => {

  //validate input 
  const error = validate(req.body);

  if (error) {
    console.log(error.details[0].message)
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await Users.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User is already registered')

  //save user into database
  try {

    //hash password
    const { name, email } = req.body;
    const password = await hash(req.body.password);

    //create new user object
    user = new Users({
      name,
      email,
      password
    })

    //save user into database
    const userSaved = await addUser(user);

    if (typeof (userSaved.email) !== "undefined") {
      const response = _.pick(userSaved, ['_id', 'name', 'email']);
      const token = user.generateToken();
      res.header('x-auth-token', token).status(200).send(response);
      console.log('User registered successfully', userSaved);
    }
    else {
      res.status(500).send('Unable to register user')
    }
  }
  catch (e) {
    console.log(e)
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    console.log('this is the req id', req.params.id);
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).send(user);
  }
  catch (e) {
    res.status(500).send('Unable to retrieve user.Try again later')
    console.log('unable to retrieve user');
  }
});

router.put("/:id", authorize, async (req, res, next) => {
  try {
    //Fetch user with the given id 
    const user = await Users.findById(req.params.id);
    if (req.body.hasOwnProperty("location")) {
      user.location = req.body.location;
    }

    else if (req.body.hasOwnProperty("description")) {
      user.description = req.body.description;
    }

    user.save();
    console.log('updated user', user);
    res.status(200).send(user);
  }
  catch (e) {
    res.status(500).send('Unable to update user.Try again later');

  }
});

module.exports = router;
