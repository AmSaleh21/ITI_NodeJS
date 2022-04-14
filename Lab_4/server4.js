//Creates an Express application
//import express, { urlencoded, json } from 'express' (ES6)
const express = require('express')

//initialize
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

//use the style files
app.use('/assets', express.static(__dirname + '/public'));

//to parse and receive JSON from the POST body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//set the routes
const routes = require('./routes/routes')
routes(app)

//start the server
app.listen(3000, () => console.log("server started at port 3000"))