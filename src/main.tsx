import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ClientSideApi } from "./api.ts";
import GameInstance from "./GameInstance.tsx";
import Lobby from "./Lobby.tsx";

const api = new ClientSideApi();

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: Lobby,
        loader: async () => {
          const games = await api.gameLibrary();
          console.log(games);
          return { games };
        },
      },
      {
        path: "/game/:id",
        Component: GameInstance,
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Error("Missing game ID.");
          }
          const loadedGame = await api.getGame(params.id);
          return { loadedGame };
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />
  </StrictMode>
);
