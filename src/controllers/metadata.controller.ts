// Libraries
import { Request, Response } from 'express';
import axios from 'axios';

// Data
import albums from '../../data-cleanedup.json';

class MetadataController {
  // eslint-disable-next-line class-methods-use-this
  public async index(req: Request, res: Response): Promise<Response> {
    const fetch = await axios.get(
      'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=60caa5e07c4a12ec3d677cf8c2f6f804&artist=Pink+Floyd&album=The+Final+Cut&format=json',
    );

    if (fetch && fetch.data) {
      const { data } = fetch;
      return res.send(data);
    }

    return res.send('no data');
  }
}

export default new MetadataController();
