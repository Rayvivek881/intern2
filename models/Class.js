const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    class_id:{
        type: String,
        required: true
    },
    year: {
        type: String,
        require: true
    },
    class_teacher: {
        type: String,
    },
    subject:{
        type: [String],
    },
    students:{
        type:[mongoose.Types.ObjectId]
    }
});

module.exports =  mongoose.model('Class', ClassSchema);
