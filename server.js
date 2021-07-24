var path = require("path");
const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "/data/db.json"));
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 8000;

server.use(middlewares);
server.use(cors());

server.use(router);
server.listen(PORT, () => {
  console.log("Server is running!");
});
