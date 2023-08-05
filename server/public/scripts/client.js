console.log('hello from client.js');
let selectedOperation = '';

//Function to run all the other funtions
function onSubmit(event) {
    //Submit the math to the server function
    submitMath()
    //operator selector function
    operator(event)
    //Clear the input function
    clearForm();
    // preform get request to show math history
    calculatorResults();
} // end submit function


// Function to handle button clicks and select operator
function operator(event) {
  const operatorValue = event.target.value;
  switch (operatorValue) {
    case '+':
      selectedOperation = '+';
      console.log('Selected +');
      break;
    case '-':
      selectedOperation = '-';
      console.log('Selected -');
      break;
    case 'X':
      selectedOperation = 'X';
      console.log('Selected X');
      break;
    case '/':
      selectedOperation = '/';
      console.log('Selected /');
      break;
    default:
      console.log('Invalid operator');
  }
}

// Add event listeners to each button
const additionButton = document.getElementById('additionButton');
const subtractionButton = document.getElementById('subtractionButton');
const multiplicationButton = document.getElementById('multiplicationButton');
const divisionButton = document.getElementById('divisionButton');

additionButton.addEventListener('click', operator);
subtractionButton.addEventListener('click', operator);
multiplicationButton.addEventListener('click', operator);
divisionButton.addEventListener('click', operator);


//Clear input function
function clearForm() {
    console.log('Clearing the Inputs');
    selectedOperation = '';
    document.querySelector('#firstNumber').value = '';
    document.querySelector('#secondNumber').value = '';
} // end clear inputs

//Get math history and append to the DOM function

function calculatorResults() {
    console.log('inside get history');
    //Call to GET calculator results
    axios.get('/calculator').then((response) => {
        console.log('Response from inside calculatorResults',response);
        let calculatorResults = response.data;
        let outputDiv = document.querySelector('#outputDiv');
        let listDiv = document.querySelector('#listDiv');
        outputDiv.innerHTML = `<h3>${calculatorResults.result}</h3>`

        listDiv.innerHTML = '';
        
        for (const calculation of calculatorResults) {
            listDiv.innerHTML += `
            <li>${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber}</li>
            `
          }
    }).catch((error) => {
        console.log('Error Within getCalculation:',error);
        alert('Something Exploded');
    });
} // end calculator results function

//Submit math function to send the math to the server
function submitMath() {
    console.log('Submit button was Clicked');
    event.preventDefault();
    let firstNumber = document.querySelector('#firstNumber').value;
    let secondNumber = document.querySelector('#secondNumber').value;
    
    if (firstNumber === '' || secondNumber === '') {
        alert('Please input valid numbers');
    } else {
    let resultToAdd = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        selectedOperation: selectedOperation
    };
    console.log('POST sending', resultToAdd);
    //Make POST to send the object just created
    axios.post('/calculator', resultToAdd).then((response) => {
                console.log('Back from server with response:',response);
        
                calculatorResults();
        
            }).catch((error) => {
                console.log(error);
                alert('Something exploded in submitMath Post')
            }); // end POST route
    } // End else
}//End submitMath















// --------------------------- OLD WORK --------------------------------
// function getCalculation() {
//     console.log('in getCalculation');

//     axios.get('/calculator').then((response) => {
//         console.log('Response from inside getCalculation',response);
//         let calculatorResults = response.data;
//         let outputDiv = document.querySelector('#outputDiv');
//         let listDiv = document.querySelector('#listDiv');
//         outputDiv.innerHTML = `<h3>${calculatorResults.result}</h3>`

//         listDiv.innerHTML = '';
        
//         for (const calculation of calculatorResults) {
//             listDiv.innerHTML += `
//             <li>${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber}</li>
//             `
//           }
//     }).catch((error) => {
//         console.log('Error Within getCalculation:',error);
//         alert('Something Exploded');
//     });
// }

// getCalculation()

// function operator(event){
//     console.log('opperation is:', event.target.innerHTML);
//     selectedOperation = event.target.innerHTML;
// }


// function submitForm(event) {
//     event.preventDefault();
//     let firstNumber = document.querySelector('#firstNumber').value;
//     let secondNumber = document.querySelector('#secondNumber').value;

//     function operator(event){
//         console.log('opperation is:', event.target.innerHTML);
//         selectedOperation = event.target.innerHTML;
//     }

//     let mathToAdd = {
//         firstNumber: firstNumber,
//         secondNumber: secondNumber,
//         operator: selectedOperation
//     };

//     console.log('math I am adding:', mathToAdd);

//     axios.post('/calculator', mathToAdd).then((response) => {
//         console.log(response);
//         document.querySelector('#firstNumber').value = '';
//         document.querySelector('#secondNumber').value = '';

//         getCalculation();

//     }).catch((error) => {
//         console.log(error);
//         alert('Something exploded in submitFrom Post')
//     })
// };



