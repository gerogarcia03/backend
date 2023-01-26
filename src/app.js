import { engine } from "express-handlebars";
import express from "express";
import viewsRoute from "./routes/view.router.js";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 8080;

const messages = [];

const httpServer = app.listen(port, () => {
  console.log(`El servidor esta corriendo en http//:localhost${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("message", "Bienvenido al servidor!");
  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("new-message", (data) => {
    console.log(data);
    messages.push(data);

    socketServer.emit("messages", messages);
  });
});

// get messages from index.js

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("public"));

app.get("/", (req, res) => {
    let homePage = {
        title: "HomePage"
    }
    res.render("home", homePage)
});


app.get("/form", (req, res) => {
  let testUser = {
    title: "Este es un formulario",
    message: "Hola gracias por registrarte!",
    name: "Jose",
  };
  res.render("form", testUser);
});

app.get("/prods", (req, res) => {
    res.render("prods")
})
