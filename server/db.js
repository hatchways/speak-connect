const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/profiledb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String

})

const Users = mongoose.model('Users', userSchema);

const addUser = async (name, email) => {
    const user = new Users({
        name,
        email
    });
    const result = await user.save();
    console.log("user saved...", result);

    getUsers();
}

const getUsers = async () => {

    const users = await Users.find();

    console.log("List of all users", users)
}

module.exports = addUser