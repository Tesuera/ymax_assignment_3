var currentProduct = null;

var alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

function init () {
    if(sessionStorage.getItem('tempUser')) {
        let user = JSON.parse(sessionStorage.getItem('tempUser'));

        $('#nav_menu').html(`
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./items-list.html">Products</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            ${user.name}
            </a>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="./profile.html">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" onclick="logout(event)">Log out</a></li>
            </ul>
        </li>
        <li class="nav-link">
            <i class="fa-solid fa-cart-shopping text-white cursor-pointer" onclick="cartOpen()"></i>
        </li>
        `)
        getProductDetail()
    } else {
        $('#nav_menu').html(`
        <li class="nav-item">
            <a class="nav-link" aria-current="page" href="./items-list.html">Products</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./signin.html">Sign in</a>
        </li>
        `)
        getProductDetail()
    }
}

function getProductDetail () {
    const currentUrl = location.href;
    const urlArray = currentUrl.split('?');

    if(!urlArray[1]) {
        location.href = './items-list.html';
        return;
    } else {
        const params = urlArray[1];
        const paramsArray = params.split('=');

        if(paramsArray[0] != 'product') {
            location.href = './items-list.html';
            return;
        } else {
            if(!paramsArray[1]) {
                location.href = './items-list.html';
                return;
            } else {
                if(Number.isInteger(parseInt(paramsArray[1]))) {
                    fetch(`https://fakestoreapi.com/products/${paramsArray[1]}`, {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json'
                        }
                    }).then(res => {
                        if(res.ok && res.status == 200) {
                            return res.json();
                        } else {
                            console.log('error');
                        }
                    })
                    .then(data => {
                        if(data.id) {
                            $('#loader').remove();
                            $('#currentProductContainer').removeClass('d-none')
                            currentProduct = data;

                            $('#currentProduct').html(`
                            <div class="col-12 col-md-5 p-3 d-flex align-items-center justify-content-center">
                                <img src="${currentProduct.image}" class="detail_product_image" alt="">
                            </div>
                            <div class="col-12 col-md-6 p-3">
                                <h1 class="text-primary fw-semibold h2 mb-1 text-primary">${currentProduct.title}</h1>
                                <small class="d-block text-warning d-block mb-3">&#9733;: ${currentProduct.rating.rate}</small>
                                <p class="text-black-50 mb-3">${currentProduct.description}</p>
                                <small class="d-block text-black-50">Price: <span class="fs-3 text-info fw-semibold">${currentProduct.price}$</span></small>
                                <button onclick="addToCart()" class="btn btn-primary btn-sm text-white mt-3 rounded-0">Add to cart</button>
                            </div>
                            `)
                        }
                    })
                } else {
                    location.href = './items-list.html';
                    return;
                }
            }
        }
    }
    
}

function addToCart () {
    if(sessionStorage.getItem('tempUser')) {
        if(cartLists.length) {
            filteredCart = cartLists.filter((each) => each.id == currentProduct.id)
    
            if(filteredCart.length) {
                alertModal.show();
            } else {
                cartLists.push(currentProduct);
                sessionStorage.setItem('cartLists', JSON.stringify(cartLists));
                $('#addAlert').removeClass('d-none');
            }
        } else {
            cartLists.push(currentProduct);
            sessionStorage.setItem('cartLists', JSON.stringify(cartLists));
            $('#addAlert').removeClass('d-none');
        }
    } else {
        loginModal.show();
    }
}

init();