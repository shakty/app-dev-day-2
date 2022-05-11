function getActivityCard(card) {
  let template =
`         <div class="col-sm-3 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
              </div>
              <div class="card-footer">
                <a target="_blank" href="${card.link}" class="btn btn-primary">Do it!</a>
              </div>
            </div>
          </div>
`
  return template;
}

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

  return await new Promise((resolve, reject) => {
    setTimeout(() => resolve(activities), 6010);
  });
}

function createActivitiesRow(cards) {
  let row = document.createElement('div');
  row.className = 'row align-items-center mt-4';
  row.id = 'feelbetter-grid';
  
  let group = document.createElement('div');
  group.className = 'card-group';

  row.appendChild(group);

  cards.forEach(card => {
    group.innerHTML += '\n' + getActivityCard(card);
  });

  return row;
}

// Update Progress bar.
function updateProgress(x) {
  document.getElementById("progress-bar").style.width = x + '%';
}