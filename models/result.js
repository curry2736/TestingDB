const mongoose = require('mongoose');
require('mongoose-type-url');
const Result = mongoose.model('Result', new mongoose.Schema({
    
    testId: {
        type: String,
        required: true,
    },

    wrong:{
        type: Array,
        required: true
    },

    correct: {
        type: Object,
        required: true
    }
}));

exports.Result = Result;
