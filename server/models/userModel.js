const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    //picture:{type:}

})

userSchema.methods.generateToken = function () {
    return jwt.sign({ name: this.name, email: this.email }, config.get("jwtKey"));
}

const Users = mongoose.model('Users', userSchema);

module.exports = Users;