import express from "express";
import prodRouter from "./routes/prod.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/products", prodRouter);
app.use("/cart", cartRouter)


const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Iniciando en http://localhost:${port}`)
});