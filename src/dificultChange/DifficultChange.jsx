import React, { useState, useEffect } from "react";
import "./DifficultChange.scss";

function DifficultChange({
  difficulty,
  setDifficulty,
  setDifficult,
  setNotChangedDifficult,
  setChangedDifficult,
}) {
  // Начальная сложность

  const handleDecrease = () => {
    if (difficulty > 1) {
      setDifficulty(difficulty - 1);
      setDifficult(calculateDifficulty(difficulty));
    }
  };

  const handleIncrease = () => {
    if (difficulty < 20) {
      setDifficulty(difficulty + 1);
      setDifficult(calculateDifficulty(difficulty));
    }
  };

  const calculateDifficulty = (level) => {
    // Формула для расчета сложности по уровню
    const quantity = Math.floor(level * 1.5); // Примерная зависимость от уровня
    const timerValue = 3000 - level * 100; // Примерная зависимость от уровня

    return {
      quantity,
      timerValue,
    };
  };
  const play = () => {
    if (difficulty > 1) {
      setNotChangedDifficult(false);
      setChangedDifficult(true);
    }
  };
  return (
    <div className="difficult-change">
      <div className="difficult-display">
        <button onClick={handleDecrease}>&lt;</button>
        <label>Уровень сложности: {difficulty}</label>
        <button onClick={handleIncrease}>&gt;</button>
      </div>
      <div className="button-style" onClick={play}>
        Играть!
      </div>
    </div>
  );
}

export default DifficultChange;
