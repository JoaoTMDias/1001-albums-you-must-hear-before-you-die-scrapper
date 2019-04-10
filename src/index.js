const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(require("./routes/index.routes"));

server.listen(port, () => {
  console.log("Server Started on port 8080");
});
