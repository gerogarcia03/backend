const http = require("http");

const server = http.createServer((req, res) => {
res.end("hola asd")
})

server.listen(8080, () => {
});