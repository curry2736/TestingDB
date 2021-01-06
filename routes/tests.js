const express = require('express');
const router = express.Router();
const { Test } = require('../models/test');

router.get('/', async (req, res) => {
    let tests = await Test.find().sort({"datePosted":-1}).exec()
    res.render('tests', {
        tests: tests
    })    
})

router.get('/:id', async(req, res) => {
    let test =  await Test.findById(req.params.id);
    console.log(test);
    res.render('test', {
        test: test,
        questionAmount: test.questionAmount
    })
})

module.exports = router; 