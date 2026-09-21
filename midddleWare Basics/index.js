const express = require('express'); // 
const app = express(); // creating an instance of the Express application
const PORT = 3000; // defining the port number on which the server will listen
const users = require('./MOCK_DATA.json'); // importing the JSON data from the file

app.use(express.json()); // middleware to parse incoming JSON requests

// Middleware function to log request details

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
   next(); // calling next() to pass control to the next middleware function.
// if next() is not called, the request will be left hanging and the client will not receive a response.
});

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });z


app.get('/api/users', (req, res) => {
  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' }); // sending a 404 response if no users are found
  }
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

