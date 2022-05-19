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


            // Important! Add your code here.
            // Detect that the mouse is hovering over a card's footer and 
            // then display the modal.

            doSolution();

        })();

    });

}

// The functions below adds additional functionalities to the modal popup, 
// but are outside of the exercise's scope.

$('#yes-do-survey').click(() => {
    window.location.href = "8_bootstrap_forms.html";
});

// If the modal is hidden unbind the jQuery hover on footer.
$('#surveyModal').on('hidden.bs.modal', function (event) {
    $("div.card-footer").unbind("mouseenter mouseleave");
});

