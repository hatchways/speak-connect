const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  audio: { type: String }, // should be required
  comments: []
});

conversationSchema.methods.numComments = function () {
  console.log(this.comments.length);
  return this.comments.length;
};

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
