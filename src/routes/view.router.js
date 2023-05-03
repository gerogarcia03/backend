import express from "express";
import { ProductManager } from "../classes/FileManager.js";
import { utils } from "../utils.js";
import path from "path";

const router = express.Router();
const productFileManager = new ProductManager(
  path.resolve(process.cwd(), "public", "products.json")
);

router.get("/", (req, res) => {
  const users = utils.users;
  const role = true;
  const myUser = {
    title: "Este es el titulo",
    users: users,
    role: role,
    style: "style.css",
  };
  console.log("desde el servidor");
});

router.get("/", async (req, res) => {
  const products = await productFileManager.getAll();
  const main = {
    title: "productos sin socket.io",
    products
  }
  res.render("index", main)
})

export default router;