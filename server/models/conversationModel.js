const mongoose = require("mongoose");

const convoSchema = new mongoose.Schema({
    title: { type: String, required: true },
})

const Conversation = mongoose.model("Convo", convoSchema);

module.exports = Conversation;
