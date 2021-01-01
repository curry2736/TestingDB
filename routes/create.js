const express = require('express');
const router = express.Router();
const { Test } = require('../models/test');

router.get('/', async (req, res) => {
    res.render('create')    
})

router.post('/', async (req, res) => {
    //console.log(req.body)
    var keyNames = Object.keys(req.body);
    let answers = {};
    answers.englishAnswerArray = req.body.englishAnswerArray.split(" ")
    answers.mathAnswerArray = req.body.mathAnswerArray.split(" ")
    answers.readingAnswerArray = req.body.readingAnswerArray.split(" ")
    answers.scienceAnswerArray = req.body.scienceAnswerArray.split(" ")

    /* for (var i = 0; i < keyNames.length; i++) {
        if ((keyNames[i].includes("question")) && (keyNames[i] != "questionAmount")) {
            answers.push(req.body[keyNames[i]])
        }
    } */



    let test = new Test ({
        title: req.body.title,
        type: "ACT",
        description: req.body.description,
        datePosted: new Date(),
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        questionAmount: req.body.questionAmount,
        pdfLink: req.body.pdfLink,
        answers: answers
    })

    await test.save(); 
    res.render('create', {

    })    
})
module.exports = router; 