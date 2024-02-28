import { useEffect, useState } from "react";
import Board from "../board/board";
import "./LoginedApp.scss";
import axios from "axios"; // Импортируем axios
import Leaderboard from "../leaderBoard/LeaderBoard";

function LoginedApp({
  player,
  difficult,
  setNotChangedDifficult,
  setChangedDifficult,
}) {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(1);
  const [win, setWin] = useState(false);
  const [defeat, setDefeat] = useState(false);

  useEffect(() => {
    if (win) {
      const userName = player;

      axios
        .put(
          `https://rowan-jumbled-willow.glitch.me/update-score/${userName}`,
          {
            newScore: score,
          }
        )
        .then((response) => {
          console.log("Score updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating score:", error.message);
        });
    }
  }, [win, score]); // Зависимость от win и score

  function restart() {
    setNotChangedDifficult(true);
    setChangedDifficult(false);
  }

  return (
    <div className="App">
      {win ? (
        <div>
          Congratulations your score is {score}
          <div className="button-style" onClick={restart}>
            заново
          </div>
        </div>
      ) : null}
      {defeat ? (
        <div>
          You lose ! Your score is {score}
          <div className="button-style" onClick={restart}>
            заново
          </div>
        </div>
      ) : null}
      {!win && !defeat ? (
        <div>
          <Leaderboard />
          <div>
            Score: {score} Time: {time} Player: {player}
          </div>
          <Board
            difficult={difficult}
            setScore={setScore}
            setTime={setTime}
            time={time}
            setWin={setWin}
            setDefeat={setDefeat}
          />
        </div>
      ) : null}
    </div>
  );
}

export default LoginedApp;
