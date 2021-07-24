const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const PORT = process.env.PORT || 8000;

server.use(router);
server.listen(PORT, () => {
  console.log("Server is running!");
});
