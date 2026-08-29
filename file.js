console.log("Hello, Node.js!");

// console.log(window); // This will throw an error because 'window' is not defined in Node.js


// console.log(globalThis); // This will log the global object in Node.js
function add ( a, b) {
    return a + b;
}

// module.exports = "Arpan";

module.exports = add; // Exporting the add function so that it can be used in other files