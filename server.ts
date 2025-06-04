import express from "express";
import ViteExpress from "vite-express";

const app = express();
const PORT = 3000;

app.get("/testing", (req, res) => res.send("Hi!"));

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port ${PORT}.`)
);
