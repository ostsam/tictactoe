// import { useState } from 'react'
import './App.css'
import './logic/logic.ts'
import { initBoard } from './logic/logic.ts'

function App() {
  // const [board, setBoard] = useState([

        const newBoard = initBoard()


  return (
    
    <div>
      {newBoard.board.map((row, i) => { 
        return row.map((col, i) => {
        return <p key={i}>{col}</p>
        })})}
    </div>
  )
}

export default App