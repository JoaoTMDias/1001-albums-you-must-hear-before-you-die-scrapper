// Libraries
import express from 'express';

// Router
const routes = express.Router();

// Controllers
import { getWebsiteContent } from "../controllers/scrapper.controllers";

// Routes
routes.get("/", (req, res) => res.send('1001 Albums'));
routes.get("/scrapper", async function(req, res){
    const counter = 1;
    const result = await getWebsiteContent(counter);

    res.send(result);
});

export {
    routes
};