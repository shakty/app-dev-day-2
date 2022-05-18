/////////////
// App Dev //
/////////////

// Module: MongoDB.
///////////////////

// It's more practical to detach the logic to connect to the database,
// from the rest of your application. How to best do it?

// You might use the _singleton_ design pattern. 
// https://refactoring.guru/design-patterns/singleton

// This patterns implements a use case in which your application to need
// to share access to one resource  (e.g., a database) across different files.

// The basic idea behind a singleton is very easy:

// - One file handles the connection and offers a method to access it.
// - The first time the file is loaded, the connection is established.
// - From that point on, the same connection object is shared.

// No exercises here, but we will use this file to load the database connection
// in Express.


const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://root:testtest@nodegame.8yx5m.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

const connectToServer = cb => {

  client.connect(err => {
    if (err) {
      console.log(err);
      if (cb) cb(err, null);
    }
    dbConnection = client.db("appdev");
    if (cb) cb(null, dbConnection);
  });
}

const db = cb => {
  if (dbConnection) return dbConnection;
  connectToServer(cb);
};

module.exports = { connectToServer, db };

