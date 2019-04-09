const express = require("express");
const routes = express.Router();

const AlbumsController = require("../controllers/index.controllers");

routes.get("/", AlbumsController.getWebsiteContent);

module.exports = routes;
