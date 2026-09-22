const express = require('express'); // 
const app = express(); // creating an instance of the Express application
const PORT = 3000; // defining the port number on which the server will listen
const users = require('./MOCK_DATA.json'); // importing the JSON data from the file
const fs = require('fs'); // importing the file system module to read and write files

app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded data
app.use(express.json()); // middleware to parse incoming JSON requests

// Middleware function to log request details

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  fs.appendFile('request_logs.txt', `${new Date().toISOString()} - ${req.method} ${req.url}\n`, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
});

const userName = "John Doe"; // example user name to be added to the request object
req.userName = userName; // adding the user name to the request object for use in subsequent middleware or route handlers
   next(); // calling next() to pass control to the next middleware function.
// if next() is not called, the request will be left hanging and the client will not receive a response.
});

app.use((req, res, next) => {
  console.log('User Name:', req.userName);
    next(); // calling next() to pass control to the next middleware function.
}
)

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });z




app.get('/api/users', (req, res) => {
  if (!users || users.length === 0) {
    return res.status(404).json({ message: 'No users found' }); // sending a 404 response if no users are found
  }
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push({...newUser, id: users.length + 1 }); // adding a new user to the users array with a unique ID
  fs.writeFile('MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => { // writing the updated users array back to the JSON file
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).json({ message: 'Internal server error' }); // sending a 500 response if there is an error writing to the file
    }
    res.status(201).json({ message: `User created successfully : ${newUser.name}` }); // sending a 201 response with the newly created user
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

