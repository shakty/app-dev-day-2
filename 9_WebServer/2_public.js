/////////////
// App Dev //
/////////////

// Module: Web Server.
//////////////////////


// Express is a fast web server for NodeJS.
// https://expressjs.com/

// A web server is a computer software that replies to incoming
// network requests by serving files (hmtl pages, images, videos, JSON, ...).

// The philosophy of Express is to be minimal and to allow for 
// complex configurations by programmers.

// Exercise 1: Create your first Express server.
////////////////////////////////////////////////

// Type in the console:

// npm install express

// When ready, start the server and point the browser to:

// http://localhost:3000/

// to check that it is working.

const express = require('express');
const app = express();
const PORT = 3000;

// Start the server on port 3000.
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// As I said, Express is **mininal**. Or lazy. It does not do
// anything unless you tell him so. So let's add some routes.

// Routes match a path from the root address to a callback function.
// The callback takes (at least) two input parameters:
// 
// - req: an object with info about the incoming network request,
// - res: an object with info and methods to respond to the request.

// Intercepts all requests.
app.get('/', (req, res) => {
    res.send('Yay! The server is running!');

});

// Intercepts requests through the path /secret.
app.get('/secret', (req, res) => {
    res.send('How did you know about this route? It was a secret!');
});

// Checkpoint.
// 1. What do you see?
// 2. What do you see at route: http://localhost:3000/secret/ ?
// 3. What do you see at route: http://localhost:3000/SECRET/ ?
// 4. What do you see at route: http://localhost:3000/notexisting/ ?


// Exercise 2: Serve public files.
//////////////////////////////////

// a. Add a public folder.

// As I told you, Express is quite lazy, it won't do anything by default.
// Let's now create a public directory in this same folder, from which
// Express will serve static assets.

// The command .use() tells express to use a "middleware" function, that is
// a function that will be executed before executing the callback for a route.
// Here we do not specify a route, meaning that it applies to all routes.

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Make sure there is something to serve in public. 
// Copy over the HTML file 7_bootstrap_modal.html
// from the previous chapter on Bootstrap and the folders css/ and js/. 

// Try it out!

// http://localhost:3000/7_bootstrap_modal.html


// b. Create an home page.

// Now you would like to have a home page, a file that is automatically
// served without the need to specify the path to it.
// To do so, you need to rename 7_bootstrap_modal.html to index.html.

// Try it out!

// http://localhost:3000/

// Does it work?

// If not, how come Express is so lazy that it does not even want to serve
// a default file?

// It turns out that the _order_ in which we add middlewares and routes matters.
// Move the express.static middleware before any other route and try again.





