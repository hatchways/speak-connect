const mongoose = require('mongoose');
const Users = require('./models/userModel');
const Conversation = require('./models/conversationModel');

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
        const user = await Users.findById(id);
        //add url to user document
        user.imageUrl = url
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
    const userName = user.name;

    const convo = new Conversation({
        title,
        audio,
        userName
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

const getConversations = async () => {
    try {
        const conversations = await Conversation.find();
        return conversations;
    }
    catch (e) {
        console.log('unable to fetch conversations');
        return e.message;
    }
}

module.exports = {
    addUser,
    addPic,
    saveConvo,
    addConvo,
    getConversations
}