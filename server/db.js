const mongoose = require('mongoose');
const Users = require('./models/userModel');

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
        res.status(200).send(user);
    }
    catch (e) {
        console.log('unable to add image');
        return e.message
    }
}
module.exports = {
    addUser,
    addPic
}