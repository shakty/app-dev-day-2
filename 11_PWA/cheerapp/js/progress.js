
    async function fetchActivities(cb) {
        // Activity Cards.
         let activities = [
         {
           title: 'Adopt A Pet Dog.',
           description: 'Don\'t wait, the bet pets go early.',
           link: 'https://www.petfinder.com/pet-adoption/dog-adoption/'
         },
         {
           title: 'Host A Dinner Party With Friends.',
           description: 'Pandemic friendly.',
           link: 'https://www.foxnews.com/food-drink/coronavirus-self-isolation-how-dinner-party-quarantine'
         },
         { 
           title: 'Play With Legos.',
           description: 'You won\'t believe what you can do with plastic bricks.',
           link: 'https://bestlifeonline.com/lego-structures/'
         },
         {
           title: 'Make Coffee Ice Cubes.',
           description: 'It takes just 10 minutes.',
           link: 'https://www.delish.com/cooking/recipe-ideas/recipes/a53453/coffee-ice-cubes-recipe/'
         },
         {
           title: 'Have A Karaoke Night.',
           description: 'Or Karaoke Mondays.',
           link: 'https://www.youtube.com/watch?v=L9fOLMDkQoU'
         },
         {
           title: 'Volunteer To Babysit For A Friend.',
           description: 'Or not.',
           link: 'https://wehavekids.com/childcare/How-to-Avoid-Babysitting-Your-Friends-Children'
         },
         {
           title: 'Try A Science Experiment.',
           description: 'Great questions to be answered still.',
           link: 'https://www.ranker.com/list/science-fair-fails/nathandavidson'
         },
         {
           title: 'Learn To Juggle.',
           description: 'With supporting text below as a natural lead-in to additional content.',
           link: 'https://www.youtube.com/watch?v=7RDfNn7crqE'
         },
         {
           title: 'Have A Water Balloon Fight.',
           description: 'The largest one involved 8,957 people. Pre-pandemic.',
           link: 'https://www.guinnessworldrecords.com/world-records/largest-water-balloon-fight'
         },
         {
           title: 'Take A Power Nap.',
           description: 'Take a Nap! Change Your Life.',
           link: 'https://www.webmd.com/balance/features/the-secret-and-surprising-power-of-naps'
         },
         {
           title: 'Make S\'mores.',
           description: 'Ready. In. 3. Minutes.',
           link: 'https://www.allrecipes.com/recipe/22146/smores/'
         },
         {
           title: 'Watch The Sunset.',
           description: 'Really',
           link: 'https://i.pinimg.com/originals/54/e4/ef/54e4efc532962909ac803fe3ab47561a.jpg'
         }
       ];
 
       // This is a bit showing-off...We could have just used 
       // the setTimeout method, without wrapping it inside a Promise.
       // But it's great to refresh how promises are created, isn't it?
       return await new Promise((resolve, reject) => {
         setTimeout(() => resolve(activities), 6010);
       });
     }


     // Update Progress bar.
    function updateProgress(x) {
        document.getElementById("progress-bar").style.width = x + '%';
      }