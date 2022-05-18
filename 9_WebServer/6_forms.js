/////////////
// App Dev //
/////////////

// Module: Web Server.
//////////////////////

// Exercise 6: Forms.
/////////////////////

// Here we learn a little bit more about forms, automatic POST
// requests by the browser vs custom fetch requests, how to use
// express-validator to validate incoming remote requests,
// and saving the incoming data to a CSV file.


const express = require("express");
const app = express();
const PORT = 3000;

// Need these instructions for cloud.
// const cors = require('cors');
// app.use(cors());

// File in directory /public/ will be cached and served.
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// POST (and PUT) requests require additional middleware to parse
// the HTTP requests' body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Third-party. Load the cookie-parsing middleware.
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Intercepts all requests.
app.get("/", (req, res) => {
  res.send("Yay! The server is running!");
});

// Intercepts requests through the path /secret.
app.get("/secret", (req, res) => {
  res.send("How did you know about this route? It was a secret!");
});

// Start the server on port 3000.
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

// Solution.
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

// Exercise.
////////////

// a. Modify public/8_bootstrap_forms.html to send data to the route
// "/survey". Ah, I forgot: create that route.
// What happens to client that submitted

// app.post("/survey/", (req, res) => {
//   console.log(req.body);
//   res.redirect("/");
//   // res.end(); // To handle page reload on client.
// });

// b. Store the data in the lightweight in-memory NDDB database.
// Ah, I forgot, you need to install it.

// c. Save the data to a CSV file in the data/ folder.
// Ah, I forgot, you need to create the data/ folder.

// Ref: https://github.com/nodeGame/NDDB

const NDDB = require("NDDB");

let db = new NDDB();
let fileName = path.resolve("data", "out.csv");

app.post("/survey/", (req, res) => {

  storeAndSave(req.body);

  res.redirect("/");
  // res.end(); // To handle page reload on client.
});

// d. Validate incoming requests with the express-validator
// package.

// Ref: https://express-validator.github.io/

const { check, validationResult } = require("express-validator");

app.post(
  "/survey2/",

  // Custom Server-side checks on incoming parameters.
  
  // We add a chain of validation middlewares. They modify
  // the req object, that will evaluated inside our usual
  // (req, res) => { ... } function with the method validationResult().

  // Check the full list of validation API here:
  // https://github.com/validatorjs/validator.js#sanitizers

  check("pwd").isLength({ min: 5, max: 10 }),
  check("address").not().isEmpty(),
  check("city").not().isEmpty(),
  check("state").not().isEmpty(),

  (req, res) => {

    console.log(req.body);

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
  console.log(item);

  db.insert(item);

  // Will always append to an existing file.
  db.save(fileName, {

    // Specify a custom header.
    header: ["email", "address"],

    // Saves only updates from previous save command.
    updatesOnly: true,
  });
}

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
