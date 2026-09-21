const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();  // it creates an instance of express application
const port = 8080; // port number on which the server will listen
const users = require("./MOCK_DATA.json"); // importing the JSON data from the file



app.use(express.urlencoded({ extended: false })); // middleware to parse URL-encoded data
app.use(express.json()); // middleware to parse JSON data

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



app.get("/users", (req, res) => {
    const html = `<h1>Users</h1><ul>${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join('')}</ul>`;
    res.send(html); // sending the HTML response with the list of users
})


// app.get("/api/users/:id", (req, res) => {
//     const userId = parseInt(req.params.id); 
//     const user = users.find(u => u.id === userId); // finding the user with the given id

//     if (!user) {
//         return res.status(404).json({ message: "User not found" }); // sending a 404 response if user is not found
//     } 
//     return res.json(user); // sending the found user as JSON response  
// });





// Chained Route Handlers for /api/users/:id --------


app.route("/api/users/:id")  // app.route() is used to create a chainable route handler for a specific path. In this case, it is used for the path "/api/users/:id", where ":id" is a route parameter that can be accessed using req.params.id. This allows us to define multiple HTTP methods (GET, PUT, DELETE) for the same route in a more organized way.
    .get((req, res) => {
        const userId = parseInt(req.params.id);
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.json(user);  
    })
    .patch((req, res) => {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        users[userIndex] = { ...users[userIndex], ...req.body, id: userId };

        fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error writing to file" });
            }

            return res.json(users[userIndex]);
        });
    })
    .delete((req, res) => {
        const userId = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        users.splice(userIndex, 1);

        fs.writeFile(path.join(__dirname, "MOCK_DATA.json"), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error writing to file" });
            }

            return res.json({ message: "User deleted successfully" });
        });
    });





    app.post("/api/users", (req, res) => {

       const body = req.body; // getting the request body ; 
      users.push({...body, id: users.length + 1}); // adding the new user to the users array with a new id
       fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err , data ) => {
        if(err){
            res.status(500).json({ message: "Error writing to file" });
        } 
            res.status(201).json({ message: "User added successfully" });
         })
         })


         app.post("/api/users/:id", (req, res) => {
            const userId = parseInt(req.params.id);
            const body = req.body ;
            users.push({...body, id: userId}); // adding the new user to the users array with the specified id
            fs.writeFile("MOCK_DATA.json", JSON.stringify(users, null, 2), (err , data ) => {
                if(err){    
                    res.status(500).json({ message: "Error writing to file" });
                }
                return res.status(201).json({ message: "User added successfully" });
            })
        }
    );


         

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // logging a message when the server starts
});