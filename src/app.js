import express from "express";
import path from "path";
import ProductManager from "./productManager.js";

const app = express();
const port = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const productManager = new ProductManager(
    path.resolve(process.cwd(), "public", "products.json"));


app.get("/", (req, res) => {
    res.send("esta es la pagina de inicio")
})


app.get("/products",  async (req, res) => {
    try {
        const prods = await productManager.getProducts();
        const limit = req.query.limit;
        let prodLimited;
        if (limit) {
            prodLimited = prods.slice(0, limit);
        }
        res.send( prodLimited || prods);
    } catch (err) {
        res.status(500).send(err.message)
    }
});

app.post("/products", async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const newProduct = req.body;
      await productManager.addProduct(products, newProduct);
      res.send(newProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  })

app.get("/products/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const product = await productManager.getProductsById(id); 
        console.log(id, product)
        res.send(product)
    }catch (err) {
        res.status(500).send(err.message)
    }
})



app.listen(port, () => {
    console.log(`Iniciando en http://localhost:${port}`)
});