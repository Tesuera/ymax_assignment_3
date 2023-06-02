var error_status = 0;
const pswCont = new bootstrap.Modal(document.getElementById('staticBackdrop'))
const alertCont = new bootstrap.Modal(document.getElementById('staticBackdrop2'));
var user;

function init() {

    if(sessionStorage.getItem('tempUser')) {
        user = JSON.parse(sessionStorage.getItem('tempUser'));

        $('#nav_username').text(user.name);
        $('#name').val(user.name);
        $('#email').val(user.email);
        $('#phone_number').val(user.phone_number);
    } else {
        location.href = "./signin.html";
    }
}

$('#edit_form').submit(e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    error_status = 0;
    $('#error_name').text("");
    $('#error_email').text("");
    $('#error_password').text("");
    $('#error_phone').text("");

    validateName(formData.get('name'));
    validateEmail(formData.get('email'));
    validatePhone(formData.get('phone_number'));

    if (!error_status) {
        pswCont.show();
    }
})

$('#done_psw').click((e) => {
    e.preventDefault();
    if($('#password').val() == user.password) {
        const formData = new FormData(document.getElementById('edit_form'));

        const tempUser = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: user.password,
            phone_number: formData.get('phone_number')
        }
        sessionStorage.setItem('tempUser', JSON.stringify(tempUser));
        location.href = "./profile.html";
    } else {
        $('#password').val('');
        pswCont.hide();
        alertCont.show();
    }
})

$('#again').click(e => {
    pswCont.show();
    alertCont.hide();
})

$('#closeModal1').click(e => {
    console.log('helo')
    $('#password').val('');
    pswCont.hide();
})

init();