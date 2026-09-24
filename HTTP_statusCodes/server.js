const express = require('express'); // 
const app = express(); // creating an instance of the Express application
const PORT = 3000; // defining the port number on which the server will listen
const users = require('./Test_Data.json'); // importing the JSON data from the file
const fs = require('fs'); 


app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded data
app.use(express.json()); // middleware to parse incoming JSON requests


// Middleware function to log request details

app.use((req, res, next) => {
      console.log('Request received:', req.method, req.url);
      fs.appendFile('request_logs.txt', `${new Date().toISOString()} - ${req.method} ${req.url}\n`, (err) => {
        if (err) {
          console.error('Error writing to log file:', err);
        }
    })
    const userName = "John Doe"; 
req.userName = userName; 
   next();
}) ; 




