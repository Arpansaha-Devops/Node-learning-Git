"use strict";

import { sub } from "./file.js"; // This is ES6 module syntax. It allows you to import functions, objects, or primitives that have been exported from another module. The `sub` function is being imported from the `file.js` module located in the same directory.
const { add } = require("./file.js"); // must have to use ./ it means current directory .
// I must have to destructure to get multiple functions value .

// console.log(add(2, 3)); // Output: 5
// console.log(sub(4,2))
add(7);
sub(4, 2);
