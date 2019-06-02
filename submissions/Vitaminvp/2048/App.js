import React, { Component } from 'react';
import Layout from './Components/Layout';
import Field from './Components/Field';
import ControlPanel from './Components/ControlPanel';
import Button from './Components/Button';
import Score from './Components/Score';
import {
  moveCells,
  directions,
  initCells,
  removeAndIncreaseCells,
  populateField,
  increaseScore
} from './helpers';
import Modal from './Components/Modal';
import {modalLoseMessage, modalWinMessage, ms, winScore} from './helpers/constants';
import { COLLEFT, COLRIGHT, H1, P } from './styles';

class App extends Component {
  state = {
    cells: initCells(),
    score: 0,
    bestScore: 0,
    isModalOpen: false
  };
  mapKeyCodeToDirection = {
    ArrowLeft: directions.LEFT,
    ArrowDown: directions.DOWN,
    ArrowRight: directions.RIGHT,
    ArrowUp: directions.UP
  };

  startNewGame = () => {
    this.setState(state => ({
      ...state,
      cells: initCells(),
      score: 0,
      isModalOpen: false
    }));
  };

  restartGame = () => {
    this.setState(state => ({
      ...state,
      isModalOpen: true,
    }));
  };
  
  componentWillMount() {
    localStorage.getItem('bestScore') &&
      this.setState({
        bestScore: JSON.parse(localStorage.getItem('bestScore'))
      });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('bestScore', JSON.stringify(nextState.bestScore));
  }

  handleKeyPress = async event => {
    if (
      ['ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp'].includes(event.code)
    ) {
      this.setState(state => ({
        ...state,
        cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.code])
      }));

      await delay(ms);
      this.setState(
        state => ({
          ...state,
          cells: removeAndIncreaseCells(state.cells)
        }),
        () => {
          this.setState(
            state => {
              const cells = populateField(state.cells, this.startNewGame);
              const score = state.score + increaseScore(state.cells);
              if (score === winScore) {
                return {
                  ...state,
                  isModalOpen: true
                };
              }
              if (!cells.length) {
                this.restartGame();
                return;
              }
              return {
                ...state,
                cells,
                score
              };
            },
            () => {
              this.setState(state => ({
                ...state,
                bestScore:
                  state.bestScore < state.score ? state.score : state.bestScore
              }));
            }
          );
        }
      );
    }
  };

  render() {
    const { cells, score, bestScore, isModalOpen } = this.state;
    return (
      <>
        <Layout>
          <H1>2048</H1>
          <ControlPanel>
            <COLLEFT>
              <Button onClick={this.startNewGame}>New Game</Button>
            </COLLEFT>
            <COLRIGHT>
              <Score title="Score">{score}</Score>
              <Score title="Best Score">{bestScore}</Score>
            </COLRIGHT>
          </ControlPanel>
          <Field cells={cells} />
          <P>
            <strong style={{ textTransform: 'upperCase' }}>
              How to play:&nbsp;
            </strong>
            Use your
            <strong> arrow keys ← ↑ → ↓</strong> to move the tiles. When two
            tiles with the same number touch, they
            <strong> merge into one!</strong>
          </P>
        </Layout>
        {isModalOpen && (
          <Modal closeModal={this.startNewGame}>
            {score === winScore ? (
              <span style={{ color: 'green' }}>{modalWinMessage}</span>
            ) : (
              <span style={{ color: 'red' }}>{modalLoseMessage}</span>
            )}
          </Modal>
        )}
      </>
    );
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export default App;
