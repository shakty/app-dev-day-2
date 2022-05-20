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
