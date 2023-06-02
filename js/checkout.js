var user;
var error_status = 0;

const passwordModal = new bootstrap.Modal(document.getElementById('passwordModal'));
const alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

function init() {

    if(sessionStorage.getItem('tempUser')) {
        user = JSON.parse(sessionStorage.getItem('tempUser'));

        $('#nav_username').text(user.name);
        setInitialValue();
        renderCartLists();
    } else {
        location.href = "./signin.html";
    }
}


function renderCartLists () {
    if(cartLists.length) {
        let cartArrayString = '';
        let totalAmount = 0;
        $('#item_count').text(cartLists.length);
        cartLists.forEach((item, index, array) => {
            cartArrayString += `
            <tr class="align-middle">
                <td class="fw-semibold text-black-50">${index + 1}</td>
                <td class="d-none d-md-block">
                <img src="${item.image}" class="check_img" alt="">
                </td>
                <td class="text-wrap" style="width: 40%;">${item.title}</td>
                <td>${item.price}$</td>
                <td>
                <div class="d-flex align-items-center justify-content-end gap-1">
                    <button onclick="goDetail(${item.id})" class="btn btn-sm btn-info text-white" title="item detail"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="removeCart(${item.id})"><i class="fa-solid fa-trash"></i></button>
                </div>
                </td>
            </tr>
            `

            totalAmount += item.price;
            $('#total_amount_checkout').text(`${totalAmount.toFixed(2)}$`)
        })

        $('#checkoutlistcontainer').html(cartArrayString);
    } else {
        alert("There's no items to checkout!");
        location.href = "./items-list.html";
    }
}

function goDetail (id) {
    if(id !== null) {
        location.href = "./detail.html?product=" + id;
    }
}

function removeCart (id) {
    if(id !== null) {
        cartLists = cartLists.filter(each => each.id !== id);
        sessionStorage.setItem('cartLists', JSON.stringify(cartLists));

        if(cartLists.length) {
            renderCartLists();
        } else {
            alert("There's no items to checkout!");
            location.href = "./items-list.html";
        }
    }
}

function setInitialValue () {
    $('#name_input').val(user.name);
    $('#email_input').val(user.email);
    $('#phone_input').val(user.phone_number);
}

$('#removeAll').click(e => {
    cartLists = [];
    sessionStorage.removeItem('cartLists');
    renderCartLists();
})

$('#checkout_form').submit(e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    error_status = 0;
    validateName(formData.get('name'));
    validateEmail(formData.get('email'));
    validatePhone(formData.get('phone_number'));
    validateAddress(formData.get('address'));
    validatePayment(formData.get('payment'));

    if(!error_status) {
        console.log('no er')
        passwordModal.show();
    }
})

$('#confirmBtn').click(e => {
    const userPsw = user.password;
    const inputPsw = $('#password').val();
    if(userPsw != inputPsw) {
        passwordModal.hide();
        $('#alert_content').text("Incorrect password. Try again.")
        alertModal.show();
    } else {
        sessionStorage.removeItem('cartLists');
        cartLists = [];

        passwordModal.hide();
        $('#message_success').text('Thanks for your ordering. You can leave a feedback if you have any problems!')
        successModal.show();
    }
})

$('#tryAgain').click (e => {
    alertModal.hide();
    $('#password').val('');
    passwordModal.show();
})

init();
