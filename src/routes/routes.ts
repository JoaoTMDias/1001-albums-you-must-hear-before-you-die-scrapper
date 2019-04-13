// Libraries
import { Router, Request, Response } from 'express';

// Controllers
import { getWebsiteContent } from '../controllers/scrapper.controllers';

// Router
const routes = Router();

// Routes
routes.get('/', (req: Request, res: Response) => res.send('1001 Albums'));
routes.get('/scrapper', async (req: Request, res: Response) => {
  const counter = 1;
  const result = await getWebsiteContent(counter);

  return res.send(result);
});

export default routes;
