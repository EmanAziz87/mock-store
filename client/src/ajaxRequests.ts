
console.log("jQuery is working!");

// Test by adding content to the page
function ajaxRequest(url: string, method: string, data?: any): JQuery.jqXHR {
    return $.ajax({
        url: url,
        method: method,
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : undefined
    });
}

function fetchProducts() {
    ajaxRequest('http://localhost:8080/api/products/', 'GET')
        .done(function(products: any[]) {
            const productContainer = $('#product-container');
            productContainer.empty();
            products.forEach(product => {
                console.log(product);
                productContainer.append(`<p>${product.name}</p>`);
            });
        });
}
fetchProducts();