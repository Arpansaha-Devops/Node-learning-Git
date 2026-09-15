const fs = require("fs");
const express = require("express");

const app = express() ;
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) ;





app.get("/", (req,res) => {

fs.writeFile("log.txt", `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n` , (err) => { 


    res.send("<h1>Welcome to Home Page</h1>");
}) ;
}) ;

app.get("/about", (req,res) => {
    fs.writeFile("log.txt", `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n` , (err) => { 
    res.send("<h1>Welcome to About Page</h1>");
}) ;
}) ;


app.get("/search", (req,res) => {
    const searchUrl = req.query.search_query;   
fs.writeFile("log.txt", `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n` , (err) => {
    res.send(`<h1>Welcome to Search Page</h1><p>You searched for: ${searchUrl}</p>`);
}) ;
}) ;

app.get("/contact", (req,res) => {
    const userName = req.query.name;
fs.writeFile("log.txt", `${Date.now()} : New Request Made : ${req.url} : ${req.method}\n` , (err) => {
    res.send(`<h1>Welcome to Contact Page</h1><p>Hello, ${userName}!</p>`);
}) ;
}) ;