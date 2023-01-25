import fs from "fs";

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.filePath);
            return JSON.parse(data);
        } catch (err) {
            throw err;
        }
    }

    async writeAll(data) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(data));
        } catch (err) {
            throw err;
        }
    }
}




class ProductManager extends FileManager {
    async add(product) {
        try {
            const products = await this.getAll()
            product.id = products.length + 1;

            products.push(product);

            await this.writeFile(this.products);
        } catch (err) {
            throw err;
        }
    }

    async update(productId, updateProduct) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error("el producto no fue encontrado");
            }
            products[index] = { ...products[index], ...updatedProduct };

            await this.writeAll(products);
        } catch (err) {
            throw err;
        }
    }

    async delete(productId) {
        try {
            const products = await this.getAll();

            const index = products.findIndex((product) => product.id === productId);
            if (index === -1) {
                throw new Error("el producto no fue encontrado");
            }
            products.splice(index, 1);

            await this.writeAll(products)
        } catch (err) {
            throw err;
        }
    }
}


class CartFileManager extends FileManager {
    async addProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("el carrito no fue encontrado");
            }
            cart.products.push(productId);

            await this.writeAll(carts);
        } catch (err) {
            throw err;
        }
    }

    async deleteProduct(cartId, productId) {
        try {
            const carts = await this.getAll();

            const cart = carts.find((cart) => cart.id === cartId);
            if (!cart) {
                throw new Error("el carrito no fue encontrado");
            }
            cart.products.splice(index, 1);

            await this.writeAll(carts)
        } catch (err) {
            throw err;
        }
    }
}

export { ProductManager, CartFileManager, FileManager }