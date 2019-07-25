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
        location: "add location",
        description: "add description"
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

const saveConvo = async (title, audio) => {
    const convo = new Conversation({
        title,
        audio
    });
    try {
        const result = await convo.save();
        return result;
    }
    catch (e) {
        console.log('Unable to save convo.', e);
    }
}

const addConvo = async (user_id, convo_id) => {

    try {
        // Fetch user with the given id
        const user = await Users.findById(user_id);
        user.conversations.push(convo_id);
        const result = await user.save();
        return result;
    }
    catch (e) {
        console.log('Unable to add convo to user document.Error message:', e);
    }
}
module.exports = {
    addUser,
    addPic,
    saveConvo,
    addConvo
}