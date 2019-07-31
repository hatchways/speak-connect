const mongoose = require("mongoose");

const convoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    audio: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    imageUrl: { type: String },
    userLikeMap: { type: Map, of: Boolean },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
})

const Conversation = mongoose.model("Convo", convoSchema);

module.exports = Conversation;
