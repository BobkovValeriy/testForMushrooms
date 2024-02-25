import React, { useState } from "react";
import "./cell.scss";

function Cell({ value, compareArray, timerValue, setCompareArray, block }) {
  const [show, setShow] = useState(false);
  const [showValueRun, setShowValueRun] = useState(false);

  function showValue() {
    if (!showValueRun) {
      if (compareArray.length < 2) {
        setCompareArray((prev) => [...prev, value]);
        setShow(true);
        setShowValueRun(true);
        setTimeout(() => {
          setShow(false);
          setShowValueRun(false);
        }, timerValue);
      } else return;
    }
  }

  return (
    <div onClick={showValue} className={show ? "cell" : "cell-close"}>
      {show && !block ? value : "***"}
    </div>
  );
}

export default Cell;
