const fs = require("fs");

// fs.writeFileSync("./Text.txt", "Hello, this is an example text file Test.", (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
// });


const os = require("os");

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("CPU:", os.cpus().length);
console.log("Total memory:", os.totalmem());
// console.log("Free memory:", os.freemem());
// console.log("Hostname:", os.hostname());
// console.log("Home directory:", os.homedir());


// console.log("1");

// // This is a Blocking Code ----- because it will block the execution until the file is written to the disk .

// const result = fs.readFileSync("./Text.txt", "utf-8");

// console.log(result);


// console.log("2");





// This is a Non-Blocking Code ----- because it will not block the execution until the file is written to the disk .

// console.log("1");

 fs.readFile("./Text.txt", "utf-8", (err, data) => {
 console.log(data);
})



// console.log("2");