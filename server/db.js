const mongoose = require('mongoose');
const Users = require('./models/userModel');
const Conversation = require('./models/conversationModel');
const Comments = require('./models/commentsModel');


mongoose.connect('mongodb://localhost/profiledb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const addUser = async (_user) => {
    const user = new Users({
        name: _user.name,
        username: _user.username,
        email: _user.email,
        password: _user.password,
        location: "",
        description: "",
        imageUrl: ""
    });

    try {
        const result = await user.save();
        return result;
    }
    catch (e) {
        console.log('unable to register user')
        return e.message
    }
}


const addPic = async (url, id) => {
    try {
        // Fetch user with the given id
        const user = await Users.findById(id).populate("conversations");

        //add url to user document
        user.imageUrl = url;

        //add url to conversation documents
        const conversations = user.conversations;
        conversations.forEach(function (conversation) {
            conversation.imageUrl = url;
            conversation.save();
        });
        // will need to do it for replies as well

        user.save();
        console.log('updated user', user);
    }
    catch (e) {
        console.log('Unable to add image.Error message:', e.message);
    }
}

const saveConvo = async (title, audio, userId) => {

    // Fetch user with the given id
    const user = await Users.findById(userId);
    const name = user.name;
    const username = user.username;
    const imageUrl = user.imageUrl;
    const userLikeMap = new Map();

    const convo = new Conversation({
        title,
        audio,
        name,
        username,
        imageUrl,
        userLikeMap
    });
    try {
        const result = await convo.save();
        return result;
    }
    catch (e) {
        console.log('Unable to save convo.', e);
    }
}

const addConvo = async (userId, convoId) => {

    try {
        // Fetch user with the given id
        const user = await Users.findById(userId);
        user.conversations.push(convoId);
        const result = await user.save();
        return result;
    }
    catch (e) {
        console.log('Unable to add convo to user document.Error message:', e);
    }
}

// add or remove the user from the conversation like mapping
const likeUnlikeConvo = async (userId, convoId) => {
    try {
        // Fetch conversation
        const convo = await Conversation.findById(convoId);

        // if user has alredy liked convo, then unlike it
        if (convo.userLikeMap.get(userId)) {
            convo.userLikeMap.delete(userId);
        }
        // like convo
        else {
            convo.userLikeMap.set(userId, true);
        }
        const result = await convo.save();
        return result;
    }
    catch (e) {
        console.log('Unable to like/unlke the conversation.Error message:', e);
    }
}

const getConversations = async () => {
    try {
        const conversations = await Conversation.find().populate('comments');
        return conversations;
    }
    catch (e) {
        console.log('unable to fetch conversations');
        return e.message;
    }
}

const saveComment = async (author, audio) => {

    const date = new Date();
    const comment = new Comments({
        author,
        audio,
        date
    });
    try {
        const result = await comment.save();
        return result;
    }
    catch (e) {
        console.log('Unable to save comment.', e);
    }
}

const addComment = async (convoId, commentID) => {

    try {
        // Fetch conversation with the given id
        const conversation = await Conversation.findById(convoId);
        conversation.comments.push(commentID);
        const updated = await conversation.save();
        console.log('Updated conversation', updated)
        return updated;
    }
    catch (e) {
        console.log('Unable to add new comment to conversation document', e);
    }
}

module.exports = {
    addUser,
    addPic,
    saveConvo,
    addConvo,
    likeUnlikeConvo,
    getConversations,
    saveComment,
    addComment
}