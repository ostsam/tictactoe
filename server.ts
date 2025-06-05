import express from "express";
import ViteExpress from "vite-express";
import { DbTicTacToeApi } from "./src/db/db";

const app = express();
app.use(express.json());
const api = new DbTicTacToeApi();
const PORT = 3000;

app.get("/api/game/:gameId", async (req, res) => {
  const game = await api.getGame(req.params.gameId);
  res.json(game);
});
app.get("/api/lobby", async (_, res) => {
  const list = await api.gameLibrary();
  res.json(list);
});

app.post("/api/game", async (_, res) => {
  const game = await api.createGame();
  res.json(game);
});

app.post("/api/game/:gameId/move", async (req, res) => {
  const game = await api.move(
    req.params.gameId,
    req.body.rowIdx,
    req.body.colIdx
  );
  res.json(game);
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port ${PORT}.`)
);
