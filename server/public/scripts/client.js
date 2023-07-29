console.log('hello from client.js');

let selectedOperation = null;

function selectOperation(operation) {
    selectedOperation = operation;
};

function performCalculation(firstNumber, secondNumber) {
    let result = 0;
    switch (selectedOperation) {
    case '+': result = firstNumber + secondNumber;
    break;
    case '-': result = firstNumber - secondNumber;
    break;
    case 'X': result = firstNumber * secondNumber;
    break;
    case '/': result = firstNumber / secondNumber;
    break;
    default: result = null;
    }
    return result;
}





// getCalculation that will get the information from the form and start a calcuation
function getCalculation(event) {
    event.preventDefault();
    // get request
   axios.get('/calculator/').then((response) => {
   console.log(response);
   let claculatorFromServer = response.data;
let outputDiv = document.querySelector('#outputDiv');
outputDiv.innerHTML = '';

// code that actually does the calculation - I think it goes here
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber');

let result = performCalculation(firstNumber, secondNumber);

outputDiv.innerHTML = `<h3>${result}</h3>`;
}).catch((error) => {
    console.log('Error with request:', error);
    alert('Something is wrong.')
   })
}

document.getElementById('additionButton').addEventListener('click', () => selectOperation('+'));
document.getElementById('subtractionButton').addEventListener('click', () => selectOperation('-'));
document.getElementById('multiplicationButton').addEventListener('click', () => selectOperation('X'));
document.getElementById('divisionButton').addEventListener('click', () => selectOperation('/'));



//clear the form function will go here


//Maybe even a clear all function here?