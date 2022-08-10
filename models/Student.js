const mongoose = require('mongoose');

const subject = new Set(["Physics", "Maths", "Chemistry", "PT", "Computer", "English"]);

const StudentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    stu_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    DOB: {
        type: String
        // format DDMMYYYY
    },
    roll:{
        type: Number,
        default: -1
    },
    marks: {
        type: [
            mongoose.Types.ObjectId
        ]
    }
});

module.exports =  mongoose.model('Student', StudentSchema)