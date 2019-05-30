import React, { Component } from "react";
import "./App.scss";
import { Heading } from "../Heading";
import { GameContainer } from "../GameContainer";
import { sumDoubleCells, rotate90 } from "../../utils/helpers";
import {
  ARROW_LEFT,
  ARROW_UP,
  ARROW_RIGHT,
  ARROW_DOWN,
  START_INT,
  COLOR_CELL
} from "../../utils/variables";

class App extends Component {
  state = {
    cells: [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ],
    score: 0,
    startGame: true,
    gameOver: false
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchend", this.handleTouchMove);
    this.setState({ startGame: true });
  }

  componentDidUpdate() {
    if (this.state.startGame) {
      this.addRandomTwo();
      this.addRandomTwo();
      this.setState({ startGame: false });
    }

    this.addColorCell();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchend", this.handleTouchMove);
  }

  handleKeyPress = ({ keyCode }) => {
    if (keyCode === ARROW_LEFT) {
      this.moveCellsLeft();
    } else if (keyCode === ARROW_UP) {
      this.moveCellsUp();
    } else if (keyCode === ARROW_RIGHT) {
      this.moveCellsRight();
    } else if (keyCode === ARROW_DOWN) {
      this.moveCellsDown();
    }
  };

  handleTouchStart = e => {
    this.setState({ startX: e.changedTouches[0].clientX });
    this.setState({ startY: e.changedTouches[0].clientY });
  };

  handleTouchMove = e => {
    let distX = e.changedTouches[0].clientX - this.state.startX;
    let distY = e.changedTouches[0].clientY - this.state.startY;
    let diffY = -30 < distY && distY < 30;
    let diffX = -30 < distX && distX < 30;

    if (distX < 0 && diffY) {
      this.moveCellsLeft();
    } else if (distX > 0 && diffY) {
      this.moveCellsRight();
    } else if (distY < 0 && diffX) {
      this.moveCellsUp();
    } else if (distY > 0 && diffX) {
      this.moveCellsDown();
    }
  };

  startNewGame = () => {
    const cells = [
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null]
    ];
    this.setState({ cells, startGame: true, gameOver: false, score: 0 });
  };

  addRandomTwo = () => {
    const { cells } = this.state;
    const min = 0;
    const max = cells.length - 1;
    const randRow = this.generateRandomInteger(min, max);
    const randColumn = this.generateRandomInteger(min, max);

    if (cells[randRow][randColumn] === null) {
      cells[randRow][randColumn] = START_INT;
      this.setState({ cells });
    } else {
      this.addRandomTwo();
    }
  };

  addColorCell = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(el => {
      Object.keys(COLOR_CELL).forEach(el2 => {
        if (el.innerHTML === el2) {
          el.className = COLOR_CELL[el2];
        }
      });
    });
  };

  moveCellsLeft = () => {
    let { cells } = this.state;
    cells = this.getArrayfromSumDoubleCells(cells);
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsUp = () => {
    let { cells } = this.state;
    cells = rotate90(cells);
    cells = this.getArrayfromSumDoubleCells(cells);
    for (let i = 0; i < 3; i++) {
      cells = rotate90(cells);
    }
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsRight = () => {
    let { cells } = this.state;
    cells = rotate90(cells);
    cells = rotate90(cells);
    cells = this.getArrayfromSumDoubleCells(cells);
    cells = rotate90(cells);
    cells = rotate90(cells);
    this.addCellsOrStartNewGame(cells);
  };

  moveCellsDown = () => {
    let { cells } = this.state;
    for (let i = 0; i < 3; i++) {
      cells = rotate90(cells);
    }
    cells = this.getArrayfromSumDoubleCells(cells);
    cells = rotate90(cells);
    this.addCellsOrStartNewGame(cells);
  };

  addCellsOrStartNewGame = arr => {
    if (!this.state.gameOver) {
      this.setState({ cells: arr });
      this.addRandomTwo();
    } else {
      alert("Game Over");
      this.startNewGame();
    }
  };

  generateRandomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  getArrayfromSumDoubleCells = arr => {
    let { score } = this.state;
    const tempScore = score;
    let isNull = false;

    arr.map(cell => {
      const arrScore = sumDoubleCells(cell);
      score += arrScore.score;
      this.setState({ score });
      if (cell.includes(null)) {
        isNull = true;
      }
      return arrScore.arr;
    });

    if (isNull || tempScore !== score) {
      return arr;
    } else {
      this.setState({ gameOver: true });
      return arr;
    }
  };

  render() {
    const { cells, score } = this.state;

    return (
      <div className="container">
        <Heading startNewGame={this.startNewGame} score={score} />
        <GameContainer cells={cells} />
      </div>
    );
  }
}

export default App;
