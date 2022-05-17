const ABC_PATTERN = text => /^[a-z ,.'-]+$/i.test(text);

const EMAIL_PATTERN = text => {
    /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(text);
};


function validateAndSetClass(form) {

    let id = form.id;

    if (id === "first" || id === "last") {
        testInputAndSetClass(form, ABC_PATTERN);
    }
    if (id === "email") {
        testInputAndSetClass(form, EMAIL_PATTERN);
    }
    // else if (id === "password") {
    //   testInputAndSetClass(form, _FIRSTABC_PATTERN);
    // }
    // else if (id === "address") {
    //   testInputAndSetClass(form, _LASTABC_PATTERN);
    // }
    else if (id === "city") {
        testInputAndSetClass(form, ABC_PATTERN);
    }
    // else if (id === "state") {
    //   testInputAndSetClass(form, _DOB_PATTERN);
    // }
    // else if (id === "zip") {
    //   testInputAndSetClass(form, _DOB_PATTERN);
    // }

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


//   function verifyValidation() {
//     let inputs = document.querySelectorAll(".validate");
//     let validInputArray = document.querySelectorAll(".is-valid");

//     if (validInputArray.length == inputs.length) {

//       document.querySelectorAll("#submitButton").removeAttr("disabled");
//       document.querySelectorAll(".succes-msg").show();

//     }
//   }


(function () {
    'use strict'

    // Fetch all the forms that need validation.
    let forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    forms.forEach(function (form) {
        // validateAndSetClass(form[i]);
        addEventListenerToInput(form);

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
