const { rejects } = require('assert');
const fs = require('fs');
const path = require('path')

class ProductManager {
    constructor() {
        this.products = [];
        this.path = path.join(__dirname, "products.json") 
    }

    addProduct( prod ) {
        return new Promise((resolve, rejects))
    }

    getProducts() {
        return this.products;
    }

    getProductsById(id) {
        const prod = this.products.find((product) => product.id === id);
        if (prod) {
            return prod;
        } else {
            console.error("not found");
        }
    }
}

const productManager = new ProductManager();
productManager.addProduct("macbook pro", "notebook gama alta", 200, "no disponible", "123abc", 2);
productManager.addProduct("amd ryzen 5 5600x", "procesador gama media", 230, "no disponible", "123abcd", 2);
productManager.addProduct("intel i5 6500", "procesador gama media", 230, "no disponible", "abc1235", 10)
console.log("product search", productManager.getProductsById());