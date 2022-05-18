/////////////
// App Dev //
/////////////

// Module: Web Server.
//////////////////////

// Here we learn how to secure our web server a bit more.

// Check this page:
// https://expressjs.com/en/advanced/best-practice-security.html


// Let's start by creating a strong password to invoke the REST API.

// 1. Use the file lib/create_api_key.js to create a strong key.

// 2. Store a hashed version of the key 

// 3. Share the key with a secure channel to users.

// Load the hashed key.
const path = require('path');
const SECRET_KEY = require(path.resolve(__dirname, 'secret', 'key.js'));
// Require bcrypt, used later to compare API with hashed key.
const bcrypt = require('bcrypt');


// Then, let's enable TSL/SSL.

// You will need a valid certificate and public key. A good certificate
// can be expensive, however you may use Let's Encrypt for a free and reliable
// alternative:

// https://letsencrypt.org/

// Instructions for a Linux/Mac O.S.

// https://dev.to/omergulen/step-by-step-node-express-ssl-certificate-run-https-server-from-scratch-in-5-steps-5b87

// For demostration purposes you can generate a self-signed certificate.
//
// Below are the steps to create one depending on your operating system:

// - Mac/Linux.

// openssl genrsa 1024 > private.key
// openssl req -new -key private.key -out cert.csr
// openssl x509 -req -in cert.csr -signkey private.key -out certificate.pem

// Alternatively, you can also use this one-liner:

// openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout private.key -out certificate.pem

// No need to enter the requested information, all inputs can be left blank.

// - Windows

// If you have Git Bash you can execute the same commands as for Mac/Linux.

// If not, please look up on the Internet what is the procedure for the exact
// version of your operating system.

// Add fs to read ssl cert and key from file system.
const fs = require('fs');
// Add https to explicitely run the HTTP server on TLS/SSL.
const https = require('https');

const express = require("express");
const app = express();
const PORT = 3000;

// Let's add a whitelist of addresses that can make requests.

const whitelistCors = 'http://localhost:3000';

// Using CORS, the web server receives and responds to requests
// normally. However, the browser will hide the responses if the 
// CORS policy is not respected.

const cors = require('cors');

// Note! When testing on localhost some browsers
// will not respect CORS origin.
// In your browser's address bar, replace localhost with
// 127.0.0.1 to see the effect.

const corsOptions = {
  origin: whitelistCors,
  optionsSuccessStatus: 200 // For backward compatibility.
};

app.use(cors(corsOptions));

// Accept JSON requests.
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});


// Let's create a stronger whitelist that prevents the server from answering.

// Need to take into account different representations,
// e.g., 127.0.0.1, ::1, localhost, etc.
const whitelistIP = [ 'localhost', '127.0.0.1', '::1' ];

app.use("/survey3/", (req, res, next) => {
  
  // If behind a proxy (e.g., Nginx)
  // let ip = req.headers['x-real-ip'];

  let ip = req.socket.remoteAddress;

  // console.log(ip);

  if (whitelistIP.indexOf(ip) !== -1) next();
  else res.status(400).json({ errors: [ { msg: `IP ${ip} not whitelisted` } ] });
  
});


// Helmet.
//////////

// Automatically setup Express to increase security.

const helmet = require("helmet");
// app.use(helmet());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "script-src": "sha256-WAaBbtpcMtdgZK5L8Ie361REuiFSRQ0U/ByGmGhTm3Y=" 
//     },
//   })
// );


// Old conf.
////////////

// File in directory /public/ will be cached and served.
app.use(express.static("public"));

// POST (and PUT) requests require additional middleware to parse
// the HTTP requests' body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-party. Load the cookie-parsing middleware.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Redirect all http to https.
app.get('*', function(req, res) {  
  res.redirect('https://' + req.headers.host + req.url);
})

// Intercepts all requests.
app.get("/", (req, res) => {
  res.send("Yay! The server is running!");
});


// Creating HTTPS server.
/////////////////////////




const httpsServer = https.createServer({
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.pem'),
}, app);

httpsServer.listen(3000, () => {
  console.log(`HTTPS Server listening on port: ${PORT}`)
});


const NDDB = require("NDDB");
let db = new NDDB();
let fileName = path.resolve("data", "out.csv");
const { check, validationResult } = require("express-validator");


// Setting rate-limiter.

const { RateLimiterMemory } = require('rate-limiter-flexible');

// 10 points to be consumed in 10 seconds.
const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 10,
});

// Points consumed per request.
const CONSUMPTION = 5;

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip, CONSUMPTION)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send({ errors: [ { msg: 'Too Many Requests' } ] });
    });
};

app.use("/survey3/", rateLimiterMiddleware);

// Exercise 7.
//////////////

// a. Use bcrypt to compare KEY to hash. Remember this approach is valid
// only if TLS/SSl is enabled. 

// b. Update server-side validation with custom messages.

// c. Update client (forms_secure.html) to 

app.use("/survey3/", (req, res, next) => {
  bcrypt.compare(req.body.key, SECRET_KEY)
     .then(isEqual => {
        if (isEqual) next();
        else res.status(400).json({ errors: [ { msg: 'Wrong API key' } ] });
      });
});


app.post(
  "/survey3/",

  // Custom Server-side checks on incoming parameters.
  
  // We add a chain of validation middlewares. They modify
  // the req object, that will evaluated inside our usual
  // (req, res) => { ... } function with the method validationResult().

  // Check the full list of validation API here:
  // https://github.com/validatorjs/validator.js#sanitizers

  check("pwd")
    .isLength({ min: 5, max: 10 })
    .withMessage('pwd must between 5 and 10 chars long'),
  check("address")
    .not().isEmpty()
    .withMessage('address is empty'),
  check("city")
    .not().isEmpty()
    .withMessage('city is empty'),
  check("state")
    .not().isEmpty()
    .withMessage('state is empty'),

  (req, res) => {

    // Finds the validation errors in this request 
    // and wraps them in an object with handy functions.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    storeAndSave(req.body);

    return res.status(200).json({ success: true });
  }
);

// Store an item in in-memory database and save it to CSV.
//////////////////////////////////////////////////////////

function storeAndSave(item) {
  // console.log(item);

  db.insert(item);

  // Will always append to an existing file.
  db.save(fileName, {

    // Specify a custom header.
    header: ["email", "address"],

    // Saves only updates from previous save command.
    updatesOnly: true,
  });
}


// Activities routes.
/////////////////////

app.get("/activities/", async (req, res) => {
  const activities = await getActivities();
  res.send(activities);
});

let checkAuth = (req, res) => {
  if (req.body.key !== "123") {
    res.status(500);
    res.send("You are not authorized");
    return false;
  }
  return true;
};

app.post("/activities/", async (req, res) => {
  if (!checkAuth(req, res)) return;
  const activities = await getActivities();
  res.send(activities);
});

// Get Activities Functions.
////////////////////////////

async function getActivities() {
  // Activity Cards.
  let activities = [
    {
      title: "Adopt A Pet Dog.",
      description: "Don't wait, the bet pets go early.",
      link: "https://www.petfinder.com/pet-adoption/dog-adoption/",
    },
    {
      title: "Host A Dinner Party With Friends.",
      description: "Pandemic friendly.",
      link:
        "https://www.foxnews.com/food-drink/coronavirus-self-isolation-how-dinner-party-quarantine",
    },
    {
      title: "Play With Legos.",
      description: "You won't believe what you can do with plastic bricks.",
      link: "https://bestlifeonline.com/lego-structures/",
    },
    {
      title: "Make Coffee Ice Cubes.",
      description: "It takes just 10 minutes.",
      link:
        "https://www.delish.com/cooking/recipe-ideas/recipes/a53453/coffee-ice-cubes-recipe/",
    },
    {
      title: "Have A Karaoke Night.",
      description: "Or Karaoke Mondays.",
      link: "https://www.youtube.com/watch?v=L9fOLMDkQoU",
    },
    {
      title: "Volunteer To Babysit For A Friend.",
      description: "Or not.",
      link:
        "https://wehavekids.com/childcare/How-to-Avoid-Babysitting-Your-Friends-Children",
    },
    {
      title: "Try A Science Experiment.",
      description: "Great questions to be answered still.",
      link: "https://www.ranker.com/list/science-fair-fails/nathandavidson",
    },
    {
      title: "Learn To Juggle.",
      description:
        "With supporting text below as a natural lead-in to additional content.",
      link: "https://www.youtube.com/watch?v=7RDfNn7crqE",
    },
    {
      title: "Have A Water Balloon Fight.",
      description: "The largest one involved 8,957 people. Pre-pandemic.",
      link:
        "https://www.guinnessworldrecords.com/world-records/largest-water-balloon-fight",
    },
    {
      title: "Take A Power Nap.",
      description: "Take a Nap! Change Your Life.",
      link:
        "https://www.webmd.com/balance/features/the-secret-and-surprising-power-of-naps",
    },
    {
      title: "Make S'mores.",
      description: "Ready. In. 3. Minutes.",
      link: "https://www.allrecipes.com/recipe/22146/smores/",
    },
    {
      title: "Watch The Sunset.",
      description: "Really",
      link:
        "https://i.pinimg.com/originals/54/e4/ef/54e4efc532962909ac803fe3ab47561a.jpg",
    },
  ];

  return await new Promise((resolve, reject) => {
    setTimeout(() => resolve(activities), Math.random() * 10000);
  });
}