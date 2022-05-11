function doSolution() {
    // Retrieve survey.
    let survey = document.getElementById('survey');

    // Make the survey visible.
    document.getElementById('survey').style.display = '';
    
    // ScrollIntoView is not available in older browser,
    // check if it is defined.
    if ('function' === typeof survey.scrollIntoView) {
        survey.scrollIntoView({
            behavior: 'smooth',
            block: 'end'
        });
    }
}