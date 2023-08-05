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
    //post req from client setting up variables
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let selectedOperation = req.body.selectedOperation;
    let result = null; // result is null to begin
  
    // Perform the calculation based on the chosen operator
    //using number to make sure the numbers we are passing are actually numbers
    if (selectedOperation === '+'){
      result = Number(firstNumber) + Number(secondNumber);
      console.log('RESULT SERVER SIDE:', result);
    }
    else if ( selectedOperation === '-') {
      result = Number(firstNumber) - Number(secondNumber);
    }
    else if (selectedOperation === 'X') {
      result = Number(firstNumber) * Number(secondNumber);
    } 
    else if (selectedOperation === '/') {
      result = Number(firstNumber) / Number(secondNumber);
    } // end if statement
    
    //push result object into the result object array

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