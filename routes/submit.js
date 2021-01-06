const express = require('express');
const router = express.Router();
const { Test } = require('../models/test');
const { Result } = require('../models/result');

router.post('/:id', async(req, res) => {
    let keyNames = Object.keys(req.body);
    let test = await Test.findById(req.params.id);
    let correct = {
        english: 0,
        math: 0,
        reading: 0,
        science: 0
    }
    let wrong = [];
    console.log(req.body)

    for (var i = 0; i < keyNames.length; i++) {

        if (req.body[keyNames[i]] == null) {
            wrong.push(i);
            continue;
        }

        if (test.type == "ACT") {
            if (i < 75) {
                if (req.body[keyNames[i]] == test.answers.englishAnswerArray[i]) {
                    correct.english++;
                } else {
                    wrong.push(i)
                }
            } else if (i < 135) {
                if (req.body[keyNames[i]] == test.answers.mathAnswerArray[i-75]) {
                    correct.math++;
                } else {
                    wrong.push(i)
                }
            } else if (i < 175) {
                if (req.body[keyNames[i]] == test.answers.readingAnswerArray[i-135]) {
                    correct.reading++;
                } else {
                    wrong.push(i)
                }
            } else {
                if (req.body[keyNames[i]] == test.answers.scienceAnswerArray[i-175]) {
                    correct.science++;
                } else {
                    wrong.push(i)
                }
            }
        }
    }

    let result = new Result({
        testId: req.params.id,
        wrong: wrong,
        correct: correct
    })

    await result.save();
    console.log(result)


    console.log(correct)
    console.log(wrong)


    //for (var i = 0; i < )

    res.send("hi")
})

module.exports = router; 