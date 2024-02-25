import { useEffect, useState } from "react";
import Board from "./board/board";
import './style/index.scss';
function App() {
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(1);
  const [win, setWin] = useState(false);
  const [defeat, setDefeat] = useState(false);
  const difficult = {
    quantity: 8, timerValue: 3000
  }
  return (
    <div className="App">
      {win ? <div> Congratulations your score is {score}</div> : null}
      {defeat ? <div> You lose ! Your score is {score}</div> : null}
      {!win && !defeat ? <div>
        <div>Score: {score} Time: {time}</div>
        <Board difficult={difficult} setScore={setScore} setTime={setTime} time={time} setWin={setWin} setDefeat={setDefeat} /></div>
        : null}
    </div>
  );
}

export default App;
