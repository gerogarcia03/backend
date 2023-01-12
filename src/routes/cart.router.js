import express from "express";
import { ProductManager } from "../classes/productManager.js";
import { v4 } from "uuid";
import path from "path";
import { CartFileManager } from "../classes/productManager.js";

const cartRouter = express.Router();
const cartFileManager = new CartFileManager(
    path.resolve(process.cwd(), "public", "carts.json")
);

const FileManager = new ProductManager(
    path.resolve(process.cwd(), "public", "products.json")
);

cartRouter.get("/", async (req, res) => {
    try {
        const carts = await cartFileManager.getAll();
        res.send(carts);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cartRouter.post("/", async (req, res) => {
    const newCart = {
        id: v4(),
        products: [],
    };

    try {
        const carts = await cartFileManager.getAll();
        await cartFileManager.writeAll([...carts, newCart]);
        res.send(newCart);
    } catch (err) {
        res.status(500).send(err.message)
    }
});

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    try {
        const carts = await cartFileManager.getAll();
        const cart = carts.find((cart) => cart.id === cid);

        if (!carts) {
            res.status(404).send("el carrito no fue encontrado");
            return;
        }
        res.send(cart);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const carts = await cartFileManager.getAll();
        const cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            res.status(404).send("el carrito no fue encontrado");
            return
        }

        const products = await ProductFileManager.getAll();
        const product = products.find((product) => product.id === pid);
        if (!product) {
            res.status(404).send("el producto no fue encontrado");
            return;
        }

        const prodInCart = cart.products.find((product) => product.id === pid);
        if (prodInCart) {
            prodInCart.quantity++;
            await cartFileManager.writeAll(carts);
            res.send("el producto fue agregado al carrito");
            return;
        } else {
            cart.products.push({ id: pid, quantity: 1 });
            await cartFileManager.writeAll(carts);
            res.send("el producto fue agregado al carrito");
            return;
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const prodInCart = cart.products.find((product) => product.id === pid);
        if (prodInCart) {
            if (prodInCart.quantity > 1) {
                prodInCart.quantity--;
                await cartFileManager.writeAll(carts);
                res.send("el producto fue eliminado del carrito");
                return;
            } else {
                cart.products = cart.products.filter((product) => product.id !== pid);
                await cartFileManager.writeAll(carts);
                res.send("el producto fue eliminado del carrito");
                return;
            }
        } else {
            res.status(404).send("el producto no fue encontrado en el carrito");
            return
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

cartRouter.delete(":/cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const carts = await cartFileManager.getAll();
        const cart = carts.find((cart) => cart.id === cid);
        if (!cart) {
            res.status(404).send("el carrito no fue encontrado");
            return;
        }

        const newCart = carts.filter((cart) => cart.id !== cid);
        await cartFileManager.writeAll(newCart);
        res.send("el carrito fue eliminado");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

export default cartRouter;