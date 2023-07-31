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

// app.post('/calculator', (req, res) =>{
//     console.log('POST request for /calculator');
//     console.log(req.body);
//     let calculationToAdd = req.body;
//     calculatorResults.push(calculationToAdd);
//     res.sendStatus(201);
// });