import express from 'express';
import bodyParser from 'body-parser';
import TrackService from '../services/trackService';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', TrackService.getAll);

app.post('/', TrackService.addOne);

app.get('/:id', TrackService.getById);

app.put('/:id', TrackService.updateOne);

app.delete('/:id', TrackService.deleteOne);


export default app;
