import express from "express";
import { DbTicTacToeApi } from "./src/db/db";
import cors from "cors";
import type { Game } from "./src/logic/logic";
import { Server } from "socket.io";
import { GAME_UPDATED, USER_JOINED } from "./src/constants";
import { CLIENT_URL } from "./src/constants";

const api = new DbTicTacToeApi();
const PORT = parseInt(process.env.PORT || "3000");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

const makeRoomId = (game: Game) => `game-${game.id}`;

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
  io.to(makeRoomId(game)).emit(GAME_UPDATED, game);
  res.json(game);
});

const server = app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected to ${socket.id}`);

  socket.on("join-game", async (id: string) => {
    const game = await api.getGame(id);
    if (!game) {
      console.error(`Game ${id} not found`);
      return;
    }

    const roomId = makeRoomId(game);
    socket.join(roomId);
    console.log(`Socket ${socket.id} has joined room ${roomId}.`);
    io.to(roomId).emit(USER_JOINED, socket.id);
  });
});
