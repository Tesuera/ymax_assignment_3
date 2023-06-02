var productLists = [];

function init () {
    if(sessionStorage.getItem('tempUser')) {
        let user = JSON.parse(sessionStorage.getItem('tempUser'));

        $('#nav_menu').html(`
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./items-list.html">Products</a>
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

        getProducts();
    } else {
        $('#nav_menu').html(`
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="./items-list.html">Products</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="./signin.html">Sign in</a>
        </li>
        `)
        getProducts();
    }
}


function getProducts () {
    fetch('https://fakestoreapi.com/products', {
        method: 'get',
        headers: {
            'Content-type' : 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        $('#loader').remove();
        productLists = data;
        if(productLists.length) {
            let listStr = ``;
            productLists.forEach((item, index, array) => {
                listStr += `
                <div class="col-12 col-md-4 col-lg-3 my-3">
                    <div class="card shadow border-0">
                    <div class="card-body">
                        <img src="${item.image}" class="product_image mb-2" alt="">
                        <h1 class="h6 text-truncate mb-0 text-primary fw-semibold mb-2">${item.title}</h1>
                        <small class="text-warning d-block">&#9733; : <span>${item.rating.rate}</span></small>
                        <small class="text-black-50">Price: <span class="h5 text-info">${item.price}$</span></small>
                        <button onclick="goDetail(${item.id})" class="btn btn-primary btn-sm w-100 text-white mt-1">See detail</button>
                    </div>
                    </div>
                </div>
                `
            })
            $('#product_container').html(listStr);
        }
    })
}

function goDetail (id) {
    if(id != null) {
        location.href = "./detail.html?product=" + id;
    }
}


init();