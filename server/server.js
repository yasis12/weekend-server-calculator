//Requires
const express = require('express');
const problemToSolve = require('./problemToSolve');

//Global Variable
const app = express();
const PORT = 5001;


//USES
app.use(express.json());
app.use(express.static('server/public'));

//Listen
app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

//GET
app.get('/calculator', function(req, res){
    console.log('Request for /calculator was made');
    res.send(problemToSolve);
});

//POST
app.post('/calculator', (req, res) => {
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let selectedOperation = req.body.selectedOperation;
    let result = 0;
  
    // Perform the calculation based on the chosen operator
    if (selectedOperation === '+'){
      result = Number(firstNumber) + Number(secondNumber);
    }
    else if ( selectedOperation === '-') {
      result = Number(firstNumber) - Number(secondNumber);
    }
    else if (selectedOperation === 'X') {
      result = Number(firstNumber) * Number(secondNumber);
    } 
    else if (selectedOperation === '/') {
      result = Number(firstNumber) / Number(secondNumber);
    }
    //sending result somewhere???
    resultObject = {
      result: result
    }
    res.send(resultObject);

    //packing up results into an object to send
    let problemToAdd = {
      firstNumber: firstNumber,
      operator: selectedOperation,
      secondNumber: secondNumber,
      result: result
    } // end object to send

    // POST
    problemToSolve.push(problemToAdd);
    res.sendStatus(201);
  }); // End POST Route