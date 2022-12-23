const fs = require('fs');
const path = require('path')

class ProductManager {
    constructor(path, products) {
        this.path = path
        this.products = [];
    }

    addProduct(product) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    if (data) {
                        this.products = JSON.parse(data);
                    }
                    product.id = this.products.length
                        ? this.products.reduce(
                            (max, product) => (product.id > max ? product.id : max),
                            0
                        ) + 1
                        : 1;
                    this.products.push(product);
                    fs.writeFile(
                        this.path,
                        JSON.stringify(this.products, null, '\t'),
                        (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve()
                            }
                        }
                    )
                }
            })
        })
    }

    getProducts() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    this.products = JSON.parse(data);
                    resolve(this.products);
                }
            })
        })
    }

    getProductsById(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.products = JSON.parse(data);
                    const product = this.products.find((product) => product.id === id);
                    resolve(product);
                }
            })
        })
    }

    updateProduct(id, product) {
        return new Promise((resolve, reject) => {
            fs.readFile(this.path, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    this.products = JSON.parse(data);
                    const index = this.products.findIndex((product) => product.id === id);
                    product.id = id;
                    this.products[index] = product;
                    fs.writeFile(
                        this.path,
                        JSON.stringify(this.products, null, '\t'),
                        (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        }
                    )
                }
            })
        })
    }

    async deleteProduct(id) {
        let data = await this.getProducts();
        let Delete = data.filter(product => product.id != id);
        if (Delete) {
            await fs.promises.writeFile('products.json', JSON.stringify(Delete, null, 2))
        } else {
            console.log("Elemento no encontrado");
        }
    }
}

module.exports = ProductManager;
const productManager = new ProductManager();
console.log(productManager.getProducts())
 
