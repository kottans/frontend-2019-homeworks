import React, { Component } from "react";
import "./Heading.scss";

class Heading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestScore: 0
    };
    this.localStorage = window.localStorage;
  }

  componentDidMount() {
    const bestScore = this.localStorage.getItem("bestScore");
    this.setState({ bestScore });
  }

  componentDidUpdate() {
    const { score } = this.props;
    const { bestScore } = this.state;
    if (score > bestScore) {
      this.localStorage.setItem("bestScore", score);
      const bestScore = this.localStorage.getItem("bestScore");
      this.setState({ bestScore });
    }
  }

  render() {
    const { startNewGame, score } = this.props;
    const { bestScore } = this.state;

    return (
      <div className="heading">
        <h1 className="title">2048</h1>
        <a className="restart-btn" onClick={startNewGame}>
          New Game
        </a>
        <div className="scores-container">
          <div className="score-container">{score}</div>
          <div className="best-container">{bestScore}</div>
        </div>
      </div>
    );
  }
}

export default Heading;
