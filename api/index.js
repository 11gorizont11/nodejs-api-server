import express from "express";

import artist from "./artist";
import track from "./track";
const app = express();


app.use('/artists', artist);
app.use('/tracks', track);

export default app;