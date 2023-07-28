const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const calculatorRouter = require('./routes/calculator.router');
const exp = require('constants');

app.use(express.json());

app.use('/calculator', calculatorRouter);

app.use(express.static('server/public'));

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});