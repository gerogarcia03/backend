import express from "express";
import { ProductManager } from "../classes/productManager.js";
import { v4 } from "uuid";
import path from "path";

const prodRouter = express.Router();
const productFileManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

prodRouter.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const products = await productFileManager.getAll();

    if (limit) {
      res.send(products.slice(0, limit));
      return;
    }

    res.send(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

prodRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const products = await productFileManager.getAll();

    const product = products.find((product) => product.id === pid);
    if (!product) {
      res.status(404).send("Producto no encontrado");
      return;
    }

    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

prodRouter.post("/", async (req, res) => {
  const newProduct = {
    id: v4(),
    ...req.body,
  };

  try {
    const products = await productFileManager.getAll();
    await productFileManager.writeAll([...products, newProduct]);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

prodRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProduct = req.body;

  try {
    const products = await productFileManager.getAll();
    const productIndex = products.findIndex((product) => product.pid === pid);
    if (productIndex === -1) {
      res.status(404).send("Producto no encontrado");
      return;
    }

    products[productIndex] = newProduct;
    await productFileManager.writeAll(products);
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

prodRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const products = await productFileManager.getAll();
    const productIndex = products.findIndex((product) => product.pid === pid);
    if (productIndex === -1) {
      res.status(404).send("Producto no encontrado");
      return;
    }

    products.splice(productIndex, 1);
    await productFileManager.writeAll(products);
    res.send("Producto eliminado");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default prodRouter;