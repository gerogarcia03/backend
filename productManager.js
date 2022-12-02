class ProductManager {
    constructor(gestor) {
        this.gestor = gestor;
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
        }
        this.products.push(product);
    }

    getProduct() {
        return this.products;
    }

    getProductById(id) {
        const prod = this.products.find((prod) => prod.id === id);
        if (prod === id) {
            console.log("Not Found");
        }
        else{
            this.products.push(prod)
        }
    }
}

const productManager = new ProductManager();
productManager.addProduct("macbook pro", "notebook gama alta", 200, "no disponible", "123dasd", 2);
productManager.addProduct("amd ryzen 5 5600x", "procesador gama media", 233, "no disponible", "123dasd", 2);
console.log(productManager.getProductById());