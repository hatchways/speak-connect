const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  conversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Convo"
    }
  ]
});

userSchema.methods.generateToken = function() {
  return jwt.sign({ name: this.name, email: this.email }, process.env.jwtKey);
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
