import React, { useEffect, useState } from "react";
import "./board.scss";
import Cell from "../cell/cell";
function shuffleArray(array) {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

function generateBoardArray(quantity) {
  const initialArray = Array.from(
    { length: quantity },
    (_, index) => index + 1
  );
  const shuffledArray = shuffleArray(initialArray.concat(initialArray));

  return shuffledArray;
}

function calculateScore(baseScore, timerValue) {
  // Используем обратную пропорциональность для расчета количества очков
  const score = baseScore * (3000 / timerValue);

  // Округляем результат, чтобы получить целое количество очков
  return Math.round(score);
}

function Board({ difficult, setScore, setWin, setDefeat, setTime, time }) {
  const { quantity, timerValue } = difficult;
  const [boardArray, setBoardArray] = useState(generateBoardArray(quantity));
  const [compareArray, setCompareArray] = useState([]);
  const [block, setBlock] = useState(false);
  const baseScore = 1;
  useEffect(() => {
    setTime((timerValue / 1000) * 60);

    setInterval(() => {
      setTime((time) => (time -= 1));
    }, 1000);
  }, []);

  useEffect(() => {
    if (compareArray.length === 2) {
      if (compareArray[0] === compareArray[1]) {
        setScore((score) => (score += calculateScore(baseScore, timerValue)));
        setBlock(true);
        setTimeout(() => {
          setBoardArray((prevBoardArray) =>
            prevBoardArray.filter((item) => item !== compareArray[0])
          );
        }, 500);
      }
      setTimeout(() => {
        setCompareArray([]);
      }, timerValue);
    }
  }, [compareArray]);
  useEffect(() => {
    setTimeout(() => {
      setBlock(false);
    }, timerValue);
  }, [block]);
  if (time <= 0) {
    setScore(0);
    setDefeat(true);
  }
  if (boardArray.length === 0) {
    setScore((score) => {
      score += time;
    });
    setWin(true);
  }
  return (
    <div className="board">
      {boardArray.map((value, index) => (
        <Cell
          value={value}
          timerValue={timerValue}
          key={index}
          compareArray={compareArray}
          setCompareArray={setCompareArray}
          block={block}
        />
      ))}
    </div>
  );
}
export default Board;
