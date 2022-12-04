class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    ) {
        const product = {
            id: this.products.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        if (
            title === undefined ||
            description === undefined ||
            price === undefined ||
            thumbnail === undefined ||
            code === undefined ||
            stock === undefined 
        ) { return console.log("all fields are required");}



        let validation = this.products.find((product) => product.code === code);
        (validation) ? console.log("Product already exists") : this.products.push(product)
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let prod = this.products.find((product) => product.id === id);
        if (prod){
            return prod;
        } else{
            return console.log("not found");
        }
    }
}

const productManager = new ProductManager();
productManager.addProduct("macbook pro", "notebook gama alta", 200, "no disponible", "123abc", 2);
productManager.addProduct("amd ryzen 5 5600x", "procesador gama media", 230, "no disponible", "123abcd", 2);
productManager.addProduct("intel i5 6500", "procesador gama media", 230, "no disponible", "abc1235", 10)
console.log("product search",productManager.getProducts());