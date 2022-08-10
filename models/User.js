const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    token:{
        type: String,
        require: true
    },
    createPassword: {
        type: Date,
        default: Date.now
    }
});

module.exports =  mongoose.model('User', UserSchema)