const mongoose = require('mongoose');
require('mongoose-type-url');
let ObjectID = require('mongodb').ObjectID;

const Test = mongoose.model('Test', new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },

    type: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
        minlength: 0,
        maxlength: 2000
    },

    datePosted: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: false,
    },

    endTime: {
        type: Date,
        required: false,
    },

    questionAmount: {
        type: Number,
        required: true
    },

    pdfLink: {
        type: String,
        required: false,
    },

    questions: {
        type: Array,
        required: false,
    },

    answers: {
        type: Object,
        required: true
    }
}));

exports.Test = Test;
