"use strict";
console.log("jQuery is working!");
// Test by adding content to the page
function ajaxRequest(url, method, data) {
    console.log("AJAX REQUEST DATA: ", data);
    return $.ajax({
        url: url,
        method: method,
        xhrFields: {
            withCredentials: true
        },
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : undefined
    });
}
function fetchProducts() {
    ajaxRequest('http://localhost:8080/api/products/', 'GET')
        .done(function (products) {
        const productContainer = $('#productContainer');
        productContainer.empty();
        productContainer.css({
            'display': 'grid',
            'padding': '5px',
            'border': '1px, solid, black',
            'grid-template-columns': 'repeat(3, 1fr)',
            'grid-template-rows': 'auto',
            'grid-gap': '10px',
            'height': '340px',
            'overflow': 'scroll'
        });
        products.forEach(product => {
            console.log(product);
            $(`<div></div>`).addClass(`product-container-${product.id} product-container`).appendTo('#productContainer');
            $(`<form><button type="submit">Delete</button></form>`).addClass(`delete-product-form-${product.id} delete-product-form`).appendTo(`.product-container-${product.id}`);
            $(`<p>${product.name} $${product.price}</p>`).css({
                'border': '1px solid black',
                'padding': '10px'
            }).appendTo(`.product-container-${product.id}`);
            $(`.delete-product-form-${product.id}`).on('submit', (event) => {
                event.preventDefault();
                deleteProduct(product.id);
            });
        });
    });
}
function addProduct(product) {
    ajaxRequest('http://localhost:8080/api/products/saveProduct', 'POST', product)
        .done(function () {
        alert('Product added successfully');
        window.location.href = 'index.html';
    }).fail(function () {
        alert('Product addition failed');
    });
}
function deleteProduct(productId) {
    ajaxRequest(`http://localhost:8080/api/products/${productId}`, 'DELETE')
        .done(function () {
        alert('Product deleted successfully');
        window.location.href = 'index.html';
    })
        .fail(function () {
        alert('Product deletion failed');
    });
}
function register(registerData) {
    console.log("REGISTER DATA: ", registerData);
    ajaxRequest('http://localhost:8080/api/users/register', 'POST', registerData)
        .done(function () {
        alert('Register successful');
        window.location.href = 'index.html';
    }).fail(function () {
        alert('Register failed');
    });
}
function login(loginData) {
    console.log("LOGIN DATA: ", loginData);
    ajaxRequest('http://localhost:8080/api/users/login', 'POST', loginData)
        .done(function () {
        alert('Login successful');
        window.location.href = 'index.html';
    }).fail(function () {
        alert('Login failed');
    });
}
function logout() {
    ajaxRequest('http://localhost:8080/api/users/logout', 'POST')
        .done(function () {
        alert('Logout successful');
        window.location.href = 'index.html';
    }).fail(function () {
        alert('Logout failed');
    });
}
$('#productForm').on('submit', (event) => {
    event.preventDefault();
    const rawName = $('#name').val();
    const rawPrice = $('#price').val();
    if (rawName === undefined || rawPrice === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or price is missing');
    }
    const name = rawName;
    const price = Number(rawPrice);
    const newProduct = {
        name: name,
        price: price
    };
    console.log("NEW PRODUCT: ", newProduct);
    addProduct(newProduct);
});
$('#registerForm').on('submit', (event) => {
    event.preventDefault();
    const rawUsername = $('#username').val();
    const rawPassword = $('#password').val();
    if (rawUsername === undefined || rawPassword === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or password is missing');
    }
    const newRegister = {
        username: rawUsername,
        password: rawPassword,
        role: 'USER'
    };
    register(newRegister);
});
$('#loginForm').on('submit', (event) => {
    console.log("LOGIN FORM SUBMITTED");
    event.preventDefault();
    const rawUsername = $('#username').val();
    const rawPassword = $('#password').val();
    if (rawUsername === undefined || rawPassword === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or password is missing');
    }
    const newLogin = {
        username: rawUsername,
        password: rawPassword
    };
    login(newLogin);
});
$('#logoutForm').on('submit', (event) => {
    event.preventDefault();
    logout();
});
ajaxRequest('http://localhost:8080/api/products/test', 'GET')
    .done(function (response, textStatus) {
    console.log(textStatus);
    $('#logoutForm').css({ display: 'block' });
}).fail(function (jqXHR, textStatus, errorThrown) {
    $('#logoutForm').css({ display: 'none' });
    console.log(textStatus);
    console.log(errorThrown);
});
console.log(ajaxRequest('http://localhost:8080/api/products/test', 'GET'));
fetchProducts();
