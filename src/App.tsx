// import { useState } from 'react'
import "./App.css";
import "./logic/logic.ts";
import { initBoard } from "./logic/logic.ts";

function App() {
  // const [board, setBoard] = useState([

  const newBoard = initBoard();

  return <div>{JSON.stringify(newBoard)}</div>;
}

export default App;
