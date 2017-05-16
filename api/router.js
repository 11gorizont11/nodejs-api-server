import express from "express";
import path from "path";

const app = express();



app.use((req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.sendFile(path.resolve(process.cwd(), "dist", "index.html"))
  }
  if (process.env.DISABLE_FRONT_END) {
    return res.status(404).json({message: "Not Found"})
  }
  res.send(res.locals.webpackStats.compilation.assets["index.html"].source());
});

export default app;
