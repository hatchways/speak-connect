const mongoose = require("mongoose");

const convoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    audio: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    imageUrl: { type: String }
})

const Conversation = mongoose.model("Convo", convoSchema);

module.exports = Conversation;
