const fs = require("fs");
console.log("1");

// fs.writeFileSync("./Text.txt", "Hello, this is an example text file Test.");
// console.log("Text written to file."); // If i change the text it will overwrite the existing content in the file.


fs.writeFile("hello.txt", "Hello World", (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("File written");
});

console.log("2");