////////////////////
// App Dev Course //
////////////////////

// Module: Packages, npm, and require
/////////////////////////////////////

// EXERCISE 1. Require local files.
///////////////////////////////////

// a. The folder lib/ contains a file named "misteryFile.js".

// Do not look inside that file! But what's inside that file?

// For you it is enough to know that it returns a function.
// Execute it and solve the mistery.

// b. Optional. If you are really cool, you might use the path module
// to create cross-platform paths.


// Ref: https://nodejs.org/api/path.html
// Ref: https://www.digitalocean.com/community/tutorials/nodejs-how-to-use__dirname

// EXERCISE 2. Export your own file.
////////////////////////////////////

// Sometimes one export needs to return multiple variables, and not just
// one function as in the "misteryFile.js" of Exercise 1.
// Create a new file inside the lib/ folder and name it "persons.js". This
// file must export two objects containing persons metadata of the type
//
// { first: 'Brendan', last: 'Eich' }
//
// { first: 'Bill', last: 'Gates' }
//
// and one method to get a random person object. In other words, the code below
// must run.

// Hint: the code below use object destructuring, ref:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

let { person1, person2, getRandomPerson } = require('./lib/persons.js');

console.log(person1);
console.log(person2);
console.log(getRandomPerson());
