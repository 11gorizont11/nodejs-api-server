import express from 'express';
import bodyParser from 'body-parser';
import PlayListService from '../services/playListService';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', PlayListService.getAll);

app.post('/', PlayListService.addOne);

app.get('/:id', PlayListService.getById);

app.put('/:id', PlayListService.updateOne);

app.delete('/:id', PlayListService.deleteOne);

export default app;