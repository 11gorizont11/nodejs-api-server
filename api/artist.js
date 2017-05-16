import express from 'express';
import bodyParser from 'body-parser';
import getAll from '../services/artist/getAll';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', getAll);


export default app;