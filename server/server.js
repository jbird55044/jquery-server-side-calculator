// bring in express from the node_modules
const express = require('express');  //actually a function
 
// bring in bodyParser which will help parse incoming data
const bodyParser = require('body-parser');

// JS math tools for parser
    // not used in this calculator, but good choice for future projects
    // const math = require('mathjs');

// create an instance of the express web server.  Call is app
const app = express();
const port = 5000;   // can be other numbers

// tell express where to find static files
app.use( express.static('server/public') );

// tell express how to parse incoming data
app.use( bodyParser.urlencoded ( {extended: true}) );



// ---  route for dynamic data  (vary for earch assignment)
let tapeData = require('./modules/tapedata');  // js is assumed
let performMath = require('./modules/calcfunction');  // math logic


// to get to data:  http://localhost:5000/cat
app.get('/calcexchange', (req, res) => {
    // console.log (`Sending calcArray data`);
    res.send(tapeData);
});

// receive calc request from client
app.post ('/calcexchange' , (req, res) => {
    let passedData = req.body.inputArray;
    res.sendStatus(200);   // tells requester all is OK
    performMath(passedData);
    tapeData.push(passedData);
    // console.log (`Passed Data at POST`, passedData);
});

// databases and start again
app.post ('/cleartape' , (req, res) => {
    let passedData = req.body.inputArray;
    res.sendStatus(200);   // tells requester all is OK
    tapeData.splice(0,tapeData.length);
    // console.log (`Clear Tape Post`, tapeData);
});

// ===  end of routes



// start server listening for requests
app.listen( port, () => {
    console.log (`Server is Listening on port ${port}`);
});  


