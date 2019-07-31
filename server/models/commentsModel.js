const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    // convoId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Convo'
    // },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    audio: { type: String, required: true },

    date: { type: String, required: true },
})

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
