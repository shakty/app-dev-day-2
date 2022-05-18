/////////////
// App Dev //
/////////////

// Module: MongoDB.
///////////////////

// Exercise 6: Express and MongoDB.
///////////////////////////////////

// Connect to server.
const dbConn = require('./4_singleton');
dbConn.connectToServer();

const express = require("express");
const app = express();
const PORT = 3000;

// Need these instructions for cloud.
// const cors = require('cors');
// app.use(cors());

// File in directory /public/ will be cached and served.
app.use(express.static("public"));

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

  console.log("Sending list of activities...");

  let db = dbConn.db().collection("activities");
  let activities = await db.find();
  activities = await activities.toArray();
  res.send(activities);
});

app.post("/survey/", (req, res) => {

  if (!checkAuth(req, res)) return;

  console.log("Saving survey data...");

  let db = dbConn.db().collection("survey");
  db.insertOne(req.body.data);
  // Notice! In this toy-example, we are saving sensitive information in plain.
  // We should NEVER do that in production and even for development servers
  // there are drawbacks. 

  res.redirect("/");
  // res.end(); // To handle page reload on client.
});

