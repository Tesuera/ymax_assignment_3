function validateName (value) {
    if(!value.length) {
        error_status = 1;
        $('#error_name').text("Name is required");
    } else if(value.length < 3) {
        error_status = 1;
        $('#error_name').text("Name must be longer than 3 characters");
    } else if(value.length > 20) {
        error_status = 1;
        $('#error_name').text('Name must not be longer than 20 characters');
    } else {
        $('#error_name').text('');
    }
}

function validateEmail (value) {
    const emailPattern = new RegExp("[a-z0-9.]*[a-z0-9.]*[@][a-z]*[.][a-z]{2,3}");  

    if(!value.length) {
        error_status = 1;
        $('#error_email').text('Email is required');
    } else if(!emailPattern.test(value)) {
        error_status = 1;
        $('#error_email').text("Email must be a valid value");
    } else {
        $('#error_email').text('');
    }
}

function validatePassword (value) {
    if(!value.length) {
        error_status = 1;
        $('#error_password').text('Password is required');
    } else if (value.length < 8) {
        error_status = 1;
        $('#error_password').text('Password must have at least 8 characters');
    } else if(value.length > 20) {
        error_status = 1;
        $("#error_password").text('Password must not be longer than 20 characters');
    } else {
        $('#error_password').text('');
    }
}

function validatePhone (value) {
    const phonePattern = new RegExp("[+][9][5][9][1-9][0-9]{6,8}");

    if(!value.length) {
        error_status = 1;
        $('#error_phone').text("Phone is required");
    } else if(!phonePattern.test(value)){
        error_status = 1;
        $('#error_phone').text("Phone number must be a valid number");
    } else {
        $('#error_phone').text('');
    }
}

function validateAddress (value) {
    if(!value.length) {
        error_status = 1;
        $('#error_address').text("Address is required");
    } else if(value.length < 10) {
        error_status = 1;
        $('#error_address').text("Address must have at least 10 characters");
    } else if(value.length > 200) {
        error_status = 1;
        $('#error_address').text('Address must not be longer than 200 characters');
    } else {
        $('#error_address').text('');
    }
}

function validatePayment (value) {
    value = parseInt(value);
    if(value == 0 || value == null || value == NaN) {
        error_status = 1;
        $('#error_payment').text("Payment is required");
    } else if(!([1, 2].includes(value))) {
        error_status= 1;
        $('#error_payment').text("Payment must be a valid value");
    } else {
        $('#error_payment').text('');
    }
}

function logout(event) {
    event.preventDefault()
    if(confirm("Are you sure to log out?")) {
        sessionStorage.removeItem('cartLists');
        sessionStorage.removeItem('tempUser');
        cartLists = [];
        location.href = "./signin.html";
        return;
    }
}