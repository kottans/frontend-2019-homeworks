import React from "react";

const Field = props => {
  let gameOver = props.props.gameOver;
  let isWin = false;
  let bestFromStorage = JSON.parse(localStorage.getItem("score"));
  const initNewField = () => {
    let cells = props.props.cells;
    let latest = props.props.latestCoordinates;
    let score = props.props.score;
    let allCells = cells.map((item, x) => {
      return item.map((i, y) => {
        if (i === 2048) {
          isWin = true;
        }
        return (
          <div className="cell-wrapper" key={"wrap-" + x + y + i}>
            <div
              className={
                "cell " +
                (latest && x === latest.i && y === latest.j ? " new" : "") +
                " cell_" +
                i
              }
            >
              {i ? i : ""}{" "}
            </div>
          </div>
        );
      });
    });
    return (
      <>
        <div>
          <h1 className="welcome">Welcome on board!</h1>
          <h3 className="score">Your score: {score ? score : 0}</h3>
          <h3 className="best-score score">
            Best score: {bestFromStorage ? bestFromStorage : 0}{" "}
          </h3>
        </div>
        <div className="field">
          {allCells}{" "}
          {isWin ? (
            <div className="loose">
              <h1>You win!</h1>
            </div>
          ) : (
            ""
          )}{" "}
          {gameOver ? (
            <div className="loose">
              <h1>You loose</h1>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  };
  return initNewField();
};
export default Field;
