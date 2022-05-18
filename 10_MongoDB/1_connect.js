/////////////
// App Dev //
/////////////

// Module: MongoDB.
///////////////////


// Your application has grown and you now need a base for your data: a database!

// There are many options available, but here we focus on MongoDB, which is 
// free, open source, can be installed locally or used on in the cloud. Ah, 
// it also has got a great documentation and a large community.

// Here is a tutorial article describing what MongoDB is:
// https://www.educba.com/mongodb-open-source/
// https://www.mongodb.com/languages/mongodb-with-nodejs

// Install the module with the usual npm command.

// npm install mongodb

// Now you can import it.

const { MongoClient } = require('mongodb');

// Notice: the module mongodb, it's not the actual database, it is rather a 
// a driver to connect to one. You can download and install mongoDB on your
// machine, but it's easier to get started with a cloud instance. 

// Exercise 1. Create a free database in the cloud.
///////////////////////////////////////////////////

// Head to:

// https://mongodb.com

// And register a free account and create your free-tier MongoDB database 
// using the Atlas interface.

// Here is a tutorial: 
// https://www.mongodb.com/docs/drivers/node/current/quick-start/

// Add a username and a password, then you will get a connection string like:

const uri = "mongodb+srv://root:XXX@yourproject.8yx5m.mongodb.net/?retryWrites=true&w=majority";

// You can learn more about this connection string here:
// https://docs.mongodb.com/ecosystem/drivers/node/

// Important! In production, you should **NOT**:
// - Connect with root user, rather create a new one with custom permissions
// - Hardcode the connection parameters in this file, but rather load them 
//   from a conf file and then store them securely offline after your app
//   has started.


// Exercise 2. Connect!
///////////////////////

// Use the code below to connect to MongoDB in the cloud.

// https://www.mongodb.com/docs/drivers/node/current/

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

console.log('Connecting to MongoDB...');

client.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected!');

  // Let's also close the connection.
  client.close();

});


// Checkpoint: Does it work? By default, you need to authorize each IP address
// that can connect to the database in the Atlas interface. 
// Hint: You can find out your IP address here: https://whatismyipaddress.com/

// Exercise 3. Bonus. Connect with async/await.
///////////////////////////////////////////////

// Too easy? Getting bored? Try to connect with the async/await pattern,
// instead of using the callback.


async function run() {
  try {
    await client.connect();
    console.log('Connected!')
  } 
  finally {
    // Ensures that the client will close when you finish/error.
    await client.close();
  }
}

console.log('Connecting to MongoDB...');
run().catch(console.log);