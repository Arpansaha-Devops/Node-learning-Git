const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();  // it creates an instance of express application
const port = 8080; // port number on which the server will listen
const users = require("./MOCK_DATA.json"); // importing the JSON data from the file

app.use((req, res, next) => {
    const log = `${new Date().toISOString()} | ${req.ip} | ${req.method} | ${req.originalUrl} | ${req.get("user-agent") || "unknown"}\n`;

    fs.appendFile(path.join(__dirname, "log.txt"), log, (err) => {
        if (err) {
            console.error("Unable to write visitor log:", err.message);
        }
    });

    next();
});


// Route to get all users -- 

app.get("/api/users", (req, res) => {
    if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" }); // sending a 404 response if no users are found
    }
   return res.json(users); // sending the entire users array as JSON response
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // logging a message when the server starts
});

app.get("/api/users/:id", (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(u => u.id === userId); // finding the user with the given id

    if (!user) {
        return res.status(404).json({ message: "User not found" }); // sending a 404 response if user is not found
    } 
    return res.json(user); // sending the found user as JSON response  
});