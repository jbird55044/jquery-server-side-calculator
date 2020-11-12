// bring in express from the node_modules
const express = require('express');  //actually a function
 
// bring in bodyParser which will help parse incoming data
const bodyParser = require('body-parser');

// create an instance of the express web server.  Call is app
const app = express();
const port = 5000;   // can be other numbers

// tell express where to find static files
app.use( express.static('server/public') );

// tell express how to parse incoming data
app.use( bodyParser.urlencoded ( {extended: true}) );

// ---  route for dynamic data  (vary for earch assignment)

const catArray = ['Abby', 'Kyo', 'Fred', 'pickles', 'chubby'];

// to get to data:  http://localhost:5000/cat
app.get('/cat', (req, res) => {
    console.log (`Sending cat data`);
    res.send(catArray);
});

app.post ('/cat' , (req, res) => {
    let catData = req.body.cat;
    console.log (`Getting cat data`, catData);
    res.sendStatus(200);   // tells requester all is OK
    catArray.push(catData);
    //res.send(catArray);
});
// ===  end of routes


// start server listening for requests
app.listen( port, () => {
    console.log (`Server is Listening on port ${port}`);
}); 