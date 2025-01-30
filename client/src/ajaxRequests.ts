import jqXHR = JQuery.jqXHR;

console.log("jQuery is working!");

// Test by adding content to the page
function ajaxRequest(url: string, method: string, data?: any): JQuery.jqXHR {
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
        .done(function(products: any[]) {
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
                $(`<form><button type="submit">Delete</button></form>`).addClass(`delete-product-form-${product.id} delete-product-form`).appendTo(`.product-container-${product.id}`)
                $(`<p>${product.name} $${product.price}</p>`).css({
                    'border': '1px solid black',
                    'padding': '10px'
                }).appendTo(`.product-container-${product.id}`);

                $(`.delete-product-form-${product.id}`).on('submit', (event: JQuery.Event): void => {
                    event.preventDefault();
                    deleteProduct(product.id);
                })
            });
        });
}

function addProduct(product: any): void {
    ajaxRequest('http://localhost:8080/api/products/saveProduct', 'POST', product)
        .done(function(): void {
            alert('Product added successfully');
            window.location.href = 'index.html';
        }).fail(function(): void {
            alert('Product addition failed');
    })
}

function deleteProduct(productId: String): void {
    ajaxRequest(`http://localhost:8080/api/products/${productId}`, 'DELETE')
    .done(function(): void {
            alert('Product deleted successfully');
            window.location.href = 'index.html';
        })
        .fail(function(): void {
            alert('Product deletion failed');
        })
}

function register(registerData: any): void {
    console.log("REGISTER DATA: ", registerData);
    ajaxRequest('http://localhost:8080/api/users/register', 'POST', registerData)
        .done(function(): void {
            alert('Register successful');
            window.location.href = 'index.html';
        }).fail(function(): void {
            alert('Register failed');
    })
}

function login(loginData: any): void {
    console.log("LOGIN DATA: ", loginData);
    ajaxRequest('http://localhost:8080/api/users/login', 'POST', loginData)
        .done(function(): void {
            alert('Login successful');
            window.location.href = 'index.html';
        }).fail(function(): void {
            alert('Login failed');
    })
}

function logout(): void {
    ajaxRequest('http://localhost:8080/api/users/logout', 'POST')
        .done(function(): void {
            alert('Logout successful');
            window.location.href = 'index.html';
        }).fail(function(): void {
            alert('Logout failed');
    })
}

$('#productForm').on('submit', (event: JQuery.Event): void => {
    event.preventDefault();
    const rawName: string | undefined = $('#name').val() as string | undefined;
    const rawPrice: string | undefined  = $('#price').val() as string | undefined;

    if (rawName === undefined || rawPrice === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or price is missing');
    }

    const name: string = rawName;
    const price: number = Number(rawPrice);

    type NewProduct = {
        name: string,
        price: number
    }

    const newProduct: NewProduct  = {
        name: name,
        price: price
    }

    console.log("NEW PRODUCT: ", newProduct);
    addProduct(newProduct);

})



$('#registerForm').on('submit', (event: JQuery.Event): void => {
    event.preventDefault();
    const rawUsername: string | undefined = $('#username').val() as string | undefined;
    const rawPassword: string | undefined  = $('#password').val() as string | undefined;

    if (rawUsername === undefined || rawPassword === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or password is missing');
    }

    type NewRegister = {
        username: string,
        password: string
        role: string
    }

    const newRegister: NewRegister = {
        username: rawUsername,
        password: rawPassword,
        role: 'USER'
    }
    register(newRegister);

});

$('#loginForm').on('submit', (event: JQuery.Event): void => {
    console.log("LOGIN FORM SUBMITTED");
    event.preventDefault();
    const rawUsername: string | undefined = $('#username').val() as string | undefined;
    const rawPassword: string | undefined  = $('#password').val() as string | undefined;

    if (rawUsername === undefined || rawPassword === undefined) {
        alert('Please fill in all fields');
        throw new Error('name and/or password is missing');
    }

    type NewLogin = {
        username: string,
        password: string
    }

    const newLogin: NewLogin = {
        username: rawUsername,
        password: rawPassword
    }

    login(newLogin);
})

$('#logoutForm').on('submit', (event: JQuery.Event): void => {
    event.preventDefault();
    logout();
})

ajaxRequest('http://localhost:8080/api/products/test', 'GET')
    .done(function(response: any, textStatus: string): void {
        console.log(textStatus);
        $('#logoutForm').css({display: 'block'});

    }).fail(function(jqXHR: jqXHR, textStatus: string, errorThrown: string): void {
        $('#logoutForm').css({display: 'none'});
        console.log(textStatus);
        console.log(errorThrown);
})

console.log(ajaxRequest('http://localhost:8080/api/products/test', 'GET'));



fetchProducts();

