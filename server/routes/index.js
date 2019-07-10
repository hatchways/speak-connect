const express = require("express");
const router = express.Router();
const addUser = require("../db")
const Joi = require("joi");

router.post("/", async (req, res, next) => {
  //validate input 

  const userSchema = {
    name: Joi.string().min(2).required(),
    email: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().equal(Joi.ref("password")).required()
  }

  const result = Joi.validate(req.body, userSchema);

  if (result.error) {
    console.log(result.error.details[0].message)
    res.status(400).send(result.error);
    return;
  }

  //save user into database
  try {
    const userSaved = await addUser(req.body.name, req.body.email, req.body.password);

    if (typeof (userSaved.email) !== "undefined") {
      res.status(200).send(req.body);
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

module.exports = router;
