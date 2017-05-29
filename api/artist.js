import express from 'express';
import bodyParser from 'body-parser';
import ArtistService from '../services/artistService';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', ArtistService.getAll);

app.post('/', ArtistService.addOne);

app.get('/:id', ArtistService.getById);

app.put('/:id', ArtistService.updateOne);

app.delete('/:id', ArtistService.deleteOne);

export default app;