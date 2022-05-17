const ABC_VALIDATE = text => /^[a-z ,.'-]+$/i.test(text);

const EMAIL_VALIDATE = text => {
    return /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(text);
};

const PWD_VALIDATE = text => {
    // Must be at least 8 characters.
    // Contain at least one number or special character.
    return text.length >= 8 && !ABC_VALIDATE(text);
};

const NOT_EMPTY_VALIDATE = text => text.trim() !== "";

const ZIP_VALIDATE = text => /^\d{5}(-\d{4})?$/.test(text);

function validateAndSetClass(form) {

    let id = form.id;

    if (id === "first" || id === "last") {
        testInputAndSetClass(form, ABC_VALIDATE);
    }
    if (id === "email") {
        testInputAndSetClass(form, EMAIL_VALIDATE);
    }
    else if (id === "pwd") {
      testInputAndSetClass(form, PWD_VALIDATE);
    }
    else if (id === "address") {
      testInputAndSetClass(form, NOT_EMPTY_VALIDATE);
    }
    else if (id === "city") {
        testInputAndSetClass(form, ABC_VALIDATE);
    }
    else if (id === "zip") {
      testInputAndSetClass(form, ZIP_VALIDATE);
    }

}

function testInputAndSetClass(input, validateCb) {

    let valid = validateCb(input.value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');

    }
    else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

}

function addEventListenerToInput(input) {
    input.addEventListener('input', function () {
        validateAndSetClass(input);
    });
}


(function () {
    'use strict'

    // Fetch all the forms that need validation.
    let forms = document.querySelectorAll('.form-control');

    // Loop over them and prevent submission
    forms.forEach(function (form) {
        if (form.classList.contains('needs-validation')) {
            addEventListenerToInput(form);
        }
    });

    let submit = document.querySelector('button');

    submit.addEventListener('click', function (event) {
        let data = {};
        let valid = true;

        forms.forEach(function (form) {

            //   validateAndSetClass(form[i]);
            validateAndSetClass(form);


            if (form.classList.contains('is-invalid')) {
                valid = false;
                return;
            }


            data[form.id] = form.value;

        });

        if (valid) {
            console.log('Submitting data...');
            console.log(data);
        }
        else {
            console.log('Data is invalid...');
        }
    });

})()
