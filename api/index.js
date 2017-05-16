import express from "express";

import artist from "./artist";
const app = express();


app.use('/artists', artist);

export default app;