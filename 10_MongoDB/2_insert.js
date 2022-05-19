/////////////
// App Dev //
/////////////

// Module: MongoDB.
///////////////////


// Exercise 3. Adding data.
///////////////////////////


// First, let's connect again.

const { MongoClient } = require('mongodb');

// Read uri from external file. File is added to .gitignore so that it 
// is not added to git index and accidentally shared.
const uri = require('./private/atlas.js');


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

  // Now let's access a database named "appdev" and create a collection named 
  // "activities".

  // In MongoDB terminology:
  // - a database is a "database" in a cluster of related databases.
  // - a collection is a coherent subset of a database.
  // - a document is a JSON-like object stored in a collection

  // As in JavaScript, there is no difference in creating and accessing a
  // database or a collection: if one does not exists, it will be created.

  // Let's create/access it:
  
  let db = client.db("appdev").collection("activities");

  
  // Here is a list of activity cards that we want to add to the database.
  let activities = [
    {
      title: "Adopt A Pet Dog.",
      description: "Don't wait, the best pets go early.",
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


  // 3.a Lets add all the items.

  // Hint: https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/
  
  // Your code here!
  // db.insertMany(activities);

  // Check if the database was updated in the Atlas cloud.

  // 3.b Now create an activity object yourself, and add it as a single item.

  // Hint: https://www.mongodb.com/docs/upcoming/reference/method/db.collection.insertOne/


  // Your code here!
  // db.insertOne({
  //   title: "Learning JS",
  //   description: "It can change your life",
  //   link: "https://javascript.info"
  // });

  
  // Check if the database was updated in the Atlas cloud.


    // Don't forget to close the connection in this file.
    client.close();
});




