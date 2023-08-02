console.log('hello from client.js');




function getCalculation() {
    console.log('in getCalculation');

    axios.get('/calculator').then((response) => {
        console.log('Response from inside getCalculation',response);
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
}

getCalculation()


let selectedOperation = '';

function operator(event){
    console.log('opperation is:', event.target.innerHTML);
    selectedOperation = event.target.innerHTML;
}


function submitForm(event) {
    event.preventDefault();
    let firstNumber = document.querySelector('#firstNumber').value;
    let secondNumber = document.querySelector('#secondNumber').value;

    function operator(event){
        console.log('opperation is:', event.target.innerHTML);
        selectedOperation = event.target.innerHTML;
    }

    let mathToAdd = {
        firstNumber: firstNumber,
        secondNumber: secondNumber,
        operator: selectedOperation
    };

    console.log('math I am adding:', mathToAdd);

    axios.post('/calculator', mathToAdd).then((response) => {
        console.log(response);
        document.querySelector('#firstNumber').value = '';
        document.querySelector('#secondNumber').value = '';

        getCalculation();

    }).catch((error) => {
        console.log(error);
        alert('Something exploded in submitFrom Post')
    })
};



