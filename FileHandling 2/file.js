const fs = require("fs");

console.log("1");

// fs.writeFileSync("./Text.txt", "Hello, this is an example text file Test.");
// console.log("Text written to file."); // If i change the text it will overwrite the existing content in the file.

// fs.writeFile("hello.txt", "Hello World", (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log("File written");
// });

// console.log("2");

// Reading a file using readFileSync (synchronous) and readFile (asynchronous) methods -----

//   const result = fs.readFileSync("./contact.txt","utf-8" ,)
const result = fs.readFile("./contact.txt", "utf-8", (err, data) => {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});
console.log(result);
