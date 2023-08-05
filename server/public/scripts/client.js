console.log('hello from client.js');
let selectedOperation = '';

//Function to run all the other funtions
function onSubmit(event) {
    //Submit the math to the server function
    submitMath()
    //Clear the input function
    clearForm();
    // preform get request to show math history
    calculatorResults();
} // end submit function


// Function to handle button clicks and select operator
function operator(event) {
  // target the opperator value and set it = to this value
  const operatorValue = event.target.value;
  //switch statement to select the chosen opperator
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
  } // end switch statement
} // end operator function

// Add event listeners to each button so when they
const additionButton = document.getElementById('additionButton');
const subtractionButton = document.getElementById('subtractionButton');
const multiplicationButton = document.getElementById('multiplicationButton');
const divisionButton = document.getElementById('divisionButton');
// when the button is clicked it will run the operator function
additionButton.addEventListener('click', operator);
subtractionButton.addEventListener('click', operator);
multiplicationButton.addEventListener('click', operator);
divisionButton.addEventListener('click', operator);


//Clear input function
function clearForm() {
    console.log('Clearing the Inputs');
    // clearing what operation was selected
    selectedOperation = '';
    //clear out the input forms
    document.querySelector('#firstNumber').value = '';
    document.querySelector('#secondNumber').value = '';
} // end clear inputs

//Get math history and append to the DOM function

function calculatorResults() {
    console.log('inside get history');
    //Call to GET calculator results from the problemToSolve.js
    axios.get('/calculator').then((response) => {
        console.log('Response from inside calculatorResults',response.data);
        //set the response data to = calculatorResults
        let calculatorResults = response.data;
        // target where we want the results and the history to be appended
        let outputDiv = document.querySelector('#outputDiv'); // this is the result
        let listDiv = document.querySelector('#listDiv'); // this is the history
        // add result to the dom
        // console.log('I expect the result of the math to be here', calculatorResults.result);

        // outputDiv.innerHTML = `<h3>${calculation.result}</h3>`

        // end result 

        //add history to the dom
        listDiv.innerHTML = '';
        //loop through each one 
        for (const calculation of calculatorResults) {
            listDiv.innerHTML += `
            <li>${calculation.firstNumber} ${calculation.operator} ${calculation.secondNumber} = ${calculation.result}</li>
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
    //setting these variables = to the # input in the form
    let firstNumber = document.querySelector('#firstNumber').value;
    let secondNumber = document.querySelector('#secondNumber').value;
    
    // making sure that the form is not empty
    if (firstNumber === '' || secondNumber === '') {
        alert('Please input valid numbers');
    } else {
      //if form is not empty package the variable into an object to send
    let resultToAdd = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        selectedOperation: selectedOperation
    };

    console.log('POST sending to the server:', resultToAdd);
    //Make POST to send the object just created
    axios.post('/calculator', resultToAdd).then((response) => {
                console.log('Back from server with response:', response);
        
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



