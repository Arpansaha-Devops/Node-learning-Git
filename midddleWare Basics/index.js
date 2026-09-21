const express = require('express'); // 
const app = express(); // creating an instance of the Express application

// Middleware function to log request details

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next(); // calling next() to pass control to the next middleware function.
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});