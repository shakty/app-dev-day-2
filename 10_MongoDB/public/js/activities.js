
// Create a function that renderes one item.
function getActivityCard(card) {
    let template =
        `<div class="col-sm-3 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.description}</p>
              </div>
              <div class="card-footer">
                <a target="_blank" href="${card.link}" class="btn btn-primary">Do it!</a>
              </div>
            </div>
          </div>`;

    return template;
}

// Create the main function to be called in HTML file.
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

function doSolution() {
    // 1sec after hoovering over a footer we show the modal
    // of the survey.
    $("div.card-footer").hover(function () {
        setTimeout(() => {

            // Create a new Modal object from our HTML template.
            // Notice: it would be better to create the myModal object 
            // outside of the listener and re-use it.
            let myModal = new bootstrap.Modal(
                document.getElementById('surveyModal')
            );

            myModal.show();
        }, 1000);
    });
}


// Do something about it.
function doSomethingAboutIt() {

    // In principle, we could add async to this callback,
    // however, jQuery is complaining, so need to create
    // a self-executing anonymous async function below.
    $(".row").first().fadeOut("fast", function () {


      $('#row-progress').fadeIn();

      // Simulate receiving data and updatign progress.
      let updates = [0, 20, 40, 60, 80, 100];
      updates.forEach((update, idx) => {
        setTimeout(() => updateProgress(update), idx * 1000);
      });

      // Self-executing anonymous async function.
      (async () => {

        let activities = await fetchActivities();

        $('#row-progress').fadeOut("fast");

        let row = createActivitiesRow(activities);

        // Get the second element with class .container,
        // and append the row with activities cards.
        document.querySelectorAll('.container')[1].appendChild(row);

        
        // A little extra delay feels better.
        setTimeout(() => {
          $("#feelbetter-grid").fadeIn("slow")[0].scrollIntoView({
            behavior: "smooth",
            block: "end"
          });

        }, 300);

        
        doSolution();

      })();

    });

  }

  // The functions below adds additional functionalities to the modal popup, 
  // but are outside of the exercise's scope.

  $('#yes-do-survey').click(() => {
    window.location.href = "survey.html";
  });

  // If the modal is hidden unbind the jQuery hover on footer.
  $('#surveyModal').on('hidden.bs.modal', function (event) {
    $("div.card-footer").unbind("mouseenter mouseleave");
  });


