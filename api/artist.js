import express from 'express';
import bodyParser from 'body-parser';
import ArtistService from '../services/artist/artistService';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', ArtistService.getAll);


export default app;