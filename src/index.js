import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { routes } from './routes/index.routes';

const app = express();
mongoose.connect('mongodb+srv://1001albums:1001albums@1001albums-qvb5g.mongodb.net/test?retryWrites=true', {
  useNewUrlParser: true,

});
const server = require("http").Server(app);
const port = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(port, () => {
  console.log("Server Started on port 3333");
});
