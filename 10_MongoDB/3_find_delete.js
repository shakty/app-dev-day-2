/////////////
// App Dev //
/////////////

// Module: MongoDB.
///////////////////


// Exercise 3. Searching for data.
//////////////////////////////////


// First, let's connect again.

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:XXX@yourproject.8yx5m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
console.log('Connecting to MongoDB...');


client.connect(async (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected!');

  let db = client.db("appdev").collection("activities");

  // Exercise 4. Basic search.
  ////////////////////////////
  
  // Search for the item with title "Adopt A Pet Dog.".
  // Hint: findOne
  
  // let item = await db.findOne({ title: 'Adopt A Pet Dog.' });
  // console.log(item)

  // Exercise 5. Cursors, your friends.
  /////////////////////////////////////
  
  // Now Just get all items from the collection "activities".
  // Hint: find.
  
  // Checkpoint: what do you get as return value? That's a cursor!
  // How do you get data out of cursor? Read here:
  // https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/read-operations/cursor/

  // let cursor = await db.find();
  
  // await cursor.forEach(doc => console.log(doc));  

  // Exercise 6. Search $where your items are.
  ////////////////////////////////////////////
  
  // If you want full control on the items returned by your search you 
  // can use the $where clause.
  
  // let cursor = await db.find({
  //   $where: 'this.description.length > 20'
  // });

  // await cursor.forEach(doc => console.log(doc));  

  // What happens if you run that code? 

  // MongoServerError: $where not allowed in this atlas tier.

  // $where searches are very expensive and should be performed
  // only when there is no other option.

  // Checkpoint: $where accepts also a function (besides a string),
  // but only in the native MongoDB shell.
  
  // Exercise 7. Deleting items.
  //////////////////////////////

  // If you want to remove an item, you need to search for it first!
  // Hint: delete and deleteOne

  // Query for a movie that has title "Annie Hall"
  const query = { title: "Adopt A Pet Dog." };
  const result = await db.deleteOne(query);
  
  if (result.deletedCount === 1) {
    console.log("Successfully deleted one document.");
  }
  else {
    console.log("No documents matched the query. Deleted 0 documents.");
  }

  // Don't forget to close the connection in this file.
  client.close();
});




