const express = require('express');
const app = express();
const PORT = 5001;
app.use(express.json());

let calculatorResults = [];

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

app.get('/calculator', function(req, res){
    console.log('Request for /calculator was made');
    res.send(calculatorResults);
});

app.post('/calculator', (req, res) => {
    let firstNumber = req.body.firstNumber;
    let secondNumber = req.body.secondNumber;
    let selectedOperation = req.body.selectedOperation;
    let result;
  
    // Perform the calculation based on the chosen operator
    switch (operator) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '-':
        result = firstNumber - secondNumber;
        break;
      case 'X':
        result = firstNumber * secondNumber;
        break;
      case '/':
        result = firstNumber / secondNumber;
        break;
    };
  
    // Store the calculation in the calculatorResults array
    calculatorResults.push(`${firstNumber} ${operator} ${secondNumber} = ${result}`);

  });