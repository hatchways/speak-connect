const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/audio-clip')
    .then(() => console.log('connected to MongoDb...'))
    .catch(err => console.error('could not connect to Mongo Db', err))