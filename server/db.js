const mongoose = require('mongoose');
const Users = require('./models/userModel');

mongoose.connect('mongodb://localhost/profiledb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const addUser = async (name, email, password) => {
    const user = new Users({
        name,
        email,
        password
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

module.exports = addUser