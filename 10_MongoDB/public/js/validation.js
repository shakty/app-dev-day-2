// Validation functions.
////////////////////////

// Simple Regex function.
const ABC_VALIDATE = text => /^[a-z ,.'-]+$/i.test(text);

// Complex Regex function. What the heck is this?!
const EMAIL_VALIDATE = text => {
    return /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(text);
};

// Validation without regex. Here it is much easier to understand 
// what's going on. Regex use should be limited to simple cases,
// because it is easy to make mistakes.
const PWD_VALIDATE = text => {
    // Must be at least 8 characters.
    // Contain at least one number or special character.
    return text.length >= 8 && !ABC_VALIDATE(text);
};

// Trimmed text must not be an empty string.
const NOT_EMPTY_VALIDATE = text => text.trim() !== "";

// Regex for US ZIP code format.
const ZIP_VALIDATE = text => /^\d{5}(-\d{4})?$/.test(text);

// Error Feedbacks.
///////////////////

const errMsgs = {
    
    abc: 'Cannot contain numbers',

    email: 'Email not valid',

    pwd: 'Must be at least 8 chars and contain a number or a special char',

    noEmpty: 'Cannot be empty',

    zip: 'Zip-code not valid'
};


function addFeedbackToInput(form) {
    let div = document.createElement('div');
    // It will be displayed only
    // if is-invalid class is also there.
    div.className = 'invalid-feedback';
    div.innerHTML = getErrMsg(form);
    form.parentElement.appendChild(div);
}

function getErrMsg(form) {
    let id = form.id;
    let err;

    if (id === "first" || id === "last" || id === "city") {
        err = errMsgs.abc;
    }
    if (id === "email") {
        err = errMsgs.email;
    }
    else if (id === "pwd") {
        err = errMsgs.pwd;
    }
    else if (id === "address") {
        err = errMsgs.noEmpty;
    }
    else if (id === "zip") {
        err = errMsgs.zip;
    }

    return err;
}


// Functions for validation of forms.
/////////////////////////////////////

// Execute validation callback and set class accordingly.
function validateAndSetClass(form) {

    let id = form.id;
    let cb;

    if (id === "first" || id === "last" || id === "city") {
        cb = ABC_VALIDATE;
    }
    if (id === "email") {
        cb = EMAIL_VALIDATE;
    }
    else if (id === "pwd") {
        cb = PWD_VALIDATE;
    }
    else if (id === "address") {
        cb = NOT_EMPTY_VALIDATE;
    }
    else if (id === "zip") {
        cb = ZIP_VALIDATE;
    }

    return _validateAndSetClass(form, cb);
}

function _validateAndSetClass(form, validateCb) {

    let valid = validateCb(form.value);

    if (valid) {
        form.classList.remove('is-invalid');
        form.classList.add('is-valid');

    }
    else {
        form.classList.remove('is-valid');
        form.classList.add('is-invalid');
    }

    return valid;
}

// We add a div with class .invalid-feedback containing the error msg.
function addValidation(form) {
    // Every time a character is added, validate input.
    form.addEventListener('input', function () {
       validateAndSetClass(form);
   });
   // If user clicks/tabs over an input remove
   // existing is-invalid class (user is making a correction).
   form.addEventListener('focus', function () {
       form.classList.remove('is-invalid');
   });

   // Add feedback when validation fails.
   addFeedbackToInput(form);
}


// Validation logic.
////////////////////

(function () {

    // Fetch all the forms that need validation.
    let forms = document.querySelectorAll('.form-control');

    // Loop over them and add validation where needed.
    forms.forEach(function (form) {
        if (form.classList.contains('needs-validation')) {
            addValidation(form);
        }
    });

    // On submit evaluate all forms, collect data,
    // and simulate submit if no errors are found.
    let submit = document.querySelector('button');
    submit.addEventListener('click', function (event) {
        let data = {};
        let submit = true;

        forms.forEach(function (form) {

            if (form.classList.contains('needs-validation')) {
                let valid = validateAndSetClass(form);
                // If one form is not valid, stops submission, but
                // keep validating remaining forms.
                if (!valid) {
                    submit = false;
                    console.log(form.id, form.value);
                }
            }
            
            // Store information.
            data[form.id] = form.value;

        });

        if (submit) {
            submitData(data);
        }
        else {
            console.log('Data is invalid...');
        }
        console.log(data);
    });

})()
