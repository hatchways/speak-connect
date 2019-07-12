const express = require("express");
const router = express.Router();
const validate = require("../validate/validateExisting");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");


router.post("/", async (req, res, next) => {

    //validate input 
    const error = validate(req.body);

    if (error) {
        console.log(error.details[0].message)
        res.status(400).send(error.details[0].message);
        return;
    }

    let user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Incorrect Email or Password ');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Incorrect Email or Password');

    const token = user.generateToken();

    res.header('x-auth-token', token).send("User authenticated!");
});

module.exports = router;
