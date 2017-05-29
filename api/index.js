import express from "express";

import artist from "./artist";
import track from "./track";
import playlist from "./playlist"
const app = express();


app.use('/artists', artist);
app.use('/tracks', track);
app.use('/playlists', playlist)

export default app;