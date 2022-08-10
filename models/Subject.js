const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    class: {
        type: mongoose.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    name: {
        type: String,
        require: true
    },
    marks:{
        type: Number,
        default: 0
    }
});

module.exports =  mongoose.model('Subject', SubjectSchema)