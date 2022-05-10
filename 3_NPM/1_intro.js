////////////////////
// App Dev Course //
////////////////////

// Module: Packages, npm, and require
/////////////////////////////////////

// EXERCISE 1. Getting started with NPM Packages.
/////////////////////////////////////////////////

// a. Search the NPM catalogue for the package 'is-odd'.
// Guess what the package is doing before looking it up.
// Yes, it is doing what you think is doing.

// b. Make the following lines of code execute without 
// errors.

// Add something here.
let odd = 1;
console.log(isOdd(odd));


// c. Now, make these lines work...

// Add something here.
let even = 2;
console.log(isEven(even));

// EXERCISE 2. Make the one-liners.
///////////////////////////////////////////

// It is a good coding practice to limit the number of dependencies to the
// essential. So, you should never use the packages is-odd and is-even in your
// projects, unless for demostration or for fun. Or both. 
// If you don't know why, you can read these articles:
// https://www.sciencealert.com/how-a-programmer-almost-broke-the-internet-by-deleting-11-lines-of-code
// https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/


// Now, I know you know how to do it, so why don't you write down the two 
// one-liners that reproduce the methods isOdd and isEven used above?
// PS: what is a one-liner? It is a line of code that achieves your goal.


// Then test your one-liner functions here. 
let num = 1;
console.log('Is the number odd? '  + (isOdd(num) ? 'Yes' : 'No'));
console.log('Is the number even? ' + (isEven(num) ? 'Yes' : 'No'));


// EXERCISE 3. Understanding the packaging.
///////////////////////////////////////////

// a. Did you notice that the 'is-odd' package has more than twice the downloads
// the package 'is-even'? (Right-column on the NPM web site, "Weekly Downloads")
// Are developers more insecure when it comes to odd numbers? There is actually 
// a more rational explanation. Check the source code of the packages inside the node_modules/ folder.

// Hint: each NodeJS package contains a package.json file. This file contains
// all the metadata about the project (name, author, keywords, etc.); the field // "main" contains the name of the file that is executed by the require() 
// function: check this file to answer the question.
// To know everything about package.json files read here:
// https://docs.npmjs.com/cli/v6/configuring-npm/package-json



// b. The the package isNumber is not part of the default node library. So, 
// why does the following code work even if you never installed it? 
// (because you didn't, right?). 

const isNumber = require('is-number');
console.log(isNumber("AhAh!"));
console.log(isNumber(123));


// Hint: Did you notice how the node_modules/ folder contains other packages // 
// other than is-odd and is-even (such as is-buffer, is-number)? 
// Who put them there? Check again the package.json files of is-odd, 
// section "dependencies."




