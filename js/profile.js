function init() {

    if(sessionStorage.getItem('tempUser')) {
        let user = JSON.parse(sessionStorage.getItem('tempUser'));

        $('#nav_username').text(user.name);
        $('#name').text(user.name);
        $('#email').text(user.email);
        $('#phone').text(user.phone_number);
    } else {
        location.href = "./signin.html";
    }
}

init();