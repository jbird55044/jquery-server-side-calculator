// bring in express from the node_modules
const express = require('express');  //actually a function
 
// bring in bodyParser which will help parse incoming data
const bodyParser = require('body-parser');

// JS math tools for parser
const math = require('mathjs');

// create an instance of the express web server.  Call is app
const app = express();
const port = 5000;   // can be other numbers

// tell express where to find static files
app.use( express.static('server/public') );

// tell express how to parse incoming data
app.use( bodyParser.urlencoded ( {extended: true}) );




// ---  route for dynamic data  (vary for earch assignment)
let calcData = require('./modules/calcdata');  // js is assumed

// to get to data:  http://localhost:5000/cat
app.get('/calcexchange', (req, res) => {
    console.log (`Sending calcArray data`);
    res.send(calcData);
});

app.post ('/calcexchange' , (req, res) => {
    let passedData = req.body.inputArray;
    res.sendStatus(200);   // tells requester all is OK
    //calcData.push(passedData);
    performMath(passedData);
    console.log (`Passed Data at POST`, passedData);
});

app.post ('/cleartape' , (req, res) => {
    let passedData = req.body.inputArray;
    res.sendStatus(200);   // tells requester all is OK
    calcData.splice(0,calcData.length);
    console.log (`Clear Tape Post`, calcData);
});

// ===  end of routes



// start server listening for requests
app.listen( port, () => {
    console.log (`Server is Listening on port ${port}`);
});  

function performMath (passedData) {
    let answer = 0;
    let cleanString = '';
    let cleanedArray = passedData.slice( 0, passedData.indexOf('='))
    console.log (`cleaned Array`, cleanedArray);
    for ( element of cleanedArray ) {
        cleanString += element
    }
    console.log (`Cleaned String`, cleanString);
    answer = math.evaluate(cleanString)
    console.log (`cleaned String`, cleanString, "math", answer);

    if (cleanString.indexOf('*') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('*'))
        let rightNumber = cleanString.slice(cleanString.indexOf('*') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber * rightNumber
    }
    if (cleanString.indexOf('-') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('-'))
        let rightNumber = cleanString.slice(cleanString.indexOf('-') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber - rightNumber
    }
    if (cleanString.indexOf('/') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('/'))
        let rightNumber = cleanString.slice(cleanString.indexOf('/') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = leftNumber / rightNumber
    }
    if (cleanString.indexOf('+') > 0 ) {
        let leftNumber = cleanString.slice(0, cleanString.indexOf('+'))
        let rightNumber = cleanString.slice(cleanString.indexOf('+') +1, cleanString.length)
        console.log (`left right`, leftNumber, rightNumber);
        answer = +leftNumber + +rightNumber
    }
    passedData.push (answer)
    console.log (`last passed data before push`, passedData);
    calcData.push(passedData);

}
