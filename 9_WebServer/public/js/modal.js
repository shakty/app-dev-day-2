
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
