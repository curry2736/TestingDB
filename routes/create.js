const express = require('express');
const router = express.Router();
const { Test } = require('../models/test');

router.get('/', async (req, res) => {
    res.render('create')    
})

router.post('/', async (req, res) => {
    console.log(req.body)
    var keyNames = Object.keys(req.body);
    let answers = {};
    let test;
    if (req.body.type == "ACT") {

        answers.englishAnswerArray = req.body.englishAnswerArray.split(" ")
        answers.mathAnswerArray = req.body.mathAnswerArray.split(" ")
        answers.readingAnswerArray = req.body.readingAnswerArray.split(" ")
        answers.scienceAnswerArray = req.body.scienceAnswerArray.split(" ")

        for (var i = 0; i < answers.englishAnswerArray.length; i++) {
            if ((answers.englishAnswerArray[i] == "A") || (answers.englishAnswerArray[i] == "F")) {
                answers.englishAnswerArray[i] = "1";
            } else if ((answers.englishAnswerArray[i] == "B") || (answers.englishAnswerArray[i] == "G")) {
                answers.englishAnswerArray[i] = "2";
            } else if ((answers.englishAnswerArray[i] == "C") || (answers.englishAnswerArray[i] == "H")) {
                answers.englishAnswerArray[i] = "3";
            } else if ((answers.englishAnswerArray[i] == "D") || (answers.englishAnswerArray[i] == "J")) {
                answers.englishAnswerArray[i] = "4";
            }
        }

        for (var i = 0; i < answers.mathAnswerArray.length; i++) {
            if ((answers.mathAnswerArray[i] == "A") || (answers.mathAnswerArray[i] == "F")) {
                answers.mathAnswerArray[i] = "1";
            } else if ((answers.mathAnswerArray[i] == "B") || (answers.mathAnswerArray[i] == "G")) {
                answers.mathAnswerArray[i] = "2";
            } else if ((answers.mathAnswerArray[i] == "C") || (answers.mathAnswerArray[i] == "H")) {
                answers.mathAnswerArray[i] = "3";
            } else if ((answers.mathAnswerArray[i] == "D") || (answers.mathAnswerArray[i] == "J")) {
                answers.mathAnswerArray[i] = "4";
            } else if ((answers.mathAnswerArray[i] == "E") || (answers.mathAnswerArray[i] == "K")) {
                answers.mathAnswerArray[i] = "5";
            }
        }

        for (var i = 0; i < answers.readingAnswerArray.length; i++) {
            if ((answers.readingAnswerArray[i] == "A") || (answers.readingAnswerArray[i] == "F")) {
                answers.readingAnswerArray[i] = "1";
            } else if ((answers.readingAnswerArray[i] == "B") || (answers.readingAnswerArray[i] == "G")) {
                answers.readingAnswerArray[i] = "2";
            } else if ((answers.readingAnswerArray[i] == "C") || (answers.readingAnswerArray[i] == "H")) {
                answers.readingAnswerArray[i] = "3";
            } else if ((answers.readingAnswerArray[i] == "D") || (answers.readingAnswerArray[i] == "J")) {
                answers.readingAnswerArray[i] = "4";
            }
        }

        for (var i = 0; i < answers.scienceAnswerArray.length; i++) {
            if ((answers.scienceAnswerArray[i] == "A") || (answers.scienceAnswerArray[i] == "F")) {
                answers.scienceAnswerArray[i] = "1";
            } else if ((answers.scienceAnswerArray[i] == "B") || (answers.scienceAnswerArray[i] == "G")) {
                answers.scienceAnswerArray[i] = "2";
            } else if ((answers.scienceAnswerArray[i] == "C") || (answers.scienceAnswerArray[i] == "H")) {
                answers.scienceAnswerArray[i] = "3";
            } else if ((answers.scienceAnswerArray[i] == "D") || (answers.scienceAnswerArray[i] == "J")) {
                answers.scienceAnswerArray[i] = "4";
            }
        }

        test =  new Test({
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
        
    } else if (req.body.type == "Custom") {
        answers.answersArray = []
        for (var i = 0; i < keyNames.length; i++) {
            if ((keyNames[i].includes("question")) && (keyNames[i] != "questionAmount")) {
                console.log(req.body[keyNames[i]])
                answers.answersArray.push(req.body[keyNames[i]])
            }
        }

        test = new Test({
            title: req.body.title,
            type: "Custom",
            description: req.body.description,
            datePosted: new Date(),
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            questionAmount: req.body.questionAmount,
            pdfLink: req.body.pdfLink,
            answers: answers
        })
        
    }

    await test.save(); 

    
    res.render('create', {

    })    
})
module.exports = router; 