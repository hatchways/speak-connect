const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/profiledb', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDb...'))
    .catch(err => console.error('Could not connect to MongoDB', err))

const profileSchema = new mongoose.Schema({
    name: String,

})

const User = mongoose.model('Profiles', profileSchema);

const addUser = async (name) => {
    const user = new User({
        name,

    });
    const result = await user.save();
    console.log(result);
}

module.exports = addUser