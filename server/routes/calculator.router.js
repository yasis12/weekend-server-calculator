const express = require('express');
const router = express.Router();

let calculatorEqual = 0;

//GET request 
router.get('/', (req, res) => {
    console.log('GET request for /calculator');
    res.send(calculatorEqual)
});

//POST Request
router.post('/add', (req, res) =>{
    console.log('POST request for /calculator');
    console.log(req.body);
    let calculationToAdd = req.body;
    calculatorEqual.push(calculationToAdd);
    res.sendStatus(201);
});

//Do I even need a delete request? if so it goes here


module.exports = router;