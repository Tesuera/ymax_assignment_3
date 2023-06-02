var cartLists = [];

function cartInit (){
    if(sessionStorage.getItem('cartLists')) {
        cartLists = JSON.parse(sessionStorage.getItem('cartLists'));
        if(cartLists.length == 0) {
            $('#checkout').addClass('disabled');
        }
    } else {
        $('#checkout').addClass('disabled');
    }
}

const cartContainer = new bootstrap.Offcanvas('#cart');

function cartOpen () {
    cartContainer.show();
    renderCart();
}

function removeFromCart (id){
    if(id !== null) {
        cartLists = cartLists.filter(each => each.id !== id);
        sessionStorage.setItem('cartLists', JSON.stringify(cartLists));
        renderCart();
    }
}

function renderCart (){
    if(cartLists.length) {
        listString = ``;
        totalAmount = 0;
        cartLists.forEach((item, index, array) => {
            listString += `
                <div class="py-3 px-2 border-bottom d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-3 w-50">
                        <a href="./detail.html?product=${item.id}" class="text-decoration-none"><img src="${item.image}" class="cart_img" alt=""></a>
                        
                        <div class="w-100">
                            <h1 class="text-primary w-100 fs-6 mb-0 fw-semibold text-truncate"><a href="./detail.html?product=${item.id}" class="text-decoration-none">${item.title}</a></h1>
                            <small class="text-black-50 d-block fs-7">${item.price}$</small>
                        </div>
                    </div>

                    <button class="btn btn-sm" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash text-danger"></i></button>
                </div>
            `;
            totalAmount += item.price;
        })
        $('#cartListsContainer').html(listString);
        $('#checkout').removeClass('disabled');
        $('#total').text(`${totalAmount.toFixed(2)}$`)
    } else {
        $('#total').text('0$');
        $('#checkout').addClass('disabled');
        $('#cartListsContainer').html(`
            <p class="small text-black-50 mb-0">No items yet</p>
        `)
    }
}

function checkOut() {
    if(cartLists.length) {
        location.href = "./checkout.html";
    } else {
        alert("No items to checkout!")
    }
}



cartInit();