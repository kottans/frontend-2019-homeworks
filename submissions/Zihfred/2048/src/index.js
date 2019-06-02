import React from 'react';
import ReactDOM from 'react-dom';
import s from './App.module.css'

function getRandomValue() {
    if (Math.random() >= 0.5) {
        return 2
    } else {
        return 4;
    }
}

function transpose(m) {
    return m[0].map((x, i) => m.map(x => x[i]));
}

class App extends React.Component {

    DELAY_AFTER_CLICK = 150;

    state = {
        history: [],
        numbers: [[0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0], [0, 0, 0, 0]]
    };

    static isHaveFreeBlocks(sections) {
        return sections.some(line => {
            return line.includes(0);
        });
    };

    addNumberToSection = () => {
        const sections = [...this.state.numbers];

        const randomSection = Math.floor(Math.random() * (3 + 1));
        const randomSectionInside = Math.floor(Math.random() * (3 + 1));

        if (!App.isHaveFreeBlocks(sections)) {
            return 0;
        }

        if (sections[randomSection][randomSectionInside] === 0) {
            sections[randomSection][randomSectionInside] = getRandomValue();
        } else {
            this.addNumberToSection();
        }

        this.setState({numbers: sections});
    };

    collision = (line, vector) => {
        let newLine = [];
        let oldRowWithoutZeroes = line.filter(item => item);
        {
            let i = 0;
            while (i < oldRowWithoutZeroes.length) {
                if ((i + 1 < oldRowWithoutZeroes.length) && (oldRowWithoutZeroes[i] === oldRowWithoutZeroes[i + 1])
                    && oldRowWithoutZeroes[i] !== 0) {

                    newLine.push(oldRowWithoutZeroes[i] * 2);
                    i++;
                } else {

                    newLine.push(oldRowWithoutZeroes[i]);
                }
                i++;
            }

        }

        if (vector) {
            for (let i = 0; i < line.length; i++) {
                if (!newLine[i]) {
                    newLine[i] = 0;
                }
            }
        } else {
            for (let i = line.length; i > 0; i--) {
                if (!newLine[line.length - i]) {
                    newLine.unshift(0)
                }
            }
        }
        return newLine;
    };

    shiftRow(row, direction, needToTranspose) {
        let shiftedRow = [...row];

        if (needToTranspose) {
            shiftedRow = [...transpose(row)];
        }
        shiftedRow = shiftedRow.map(line => {
            let resultLine = [];
            let valuesLine = line.filter(oneNumber => {
                return oneNumber !== 0;
            });

            for (let i = 0; i < shiftedRow.length; i++) {
                if (!valuesLine[i]) {
                    if (direction) {
                        valuesLine.push(0);
                    }
                    else {
                        valuesLine.unshift(0);
                    }
                }
                resultLine.push(valuesLine);
            }

            valuesLine = this.collision(valuesLine, direction);
            return valuesLine;
        });

        if (needToTranspose) {
            shiftedRow = [...transpose(shiftedRow)];
        }

        this.state.history.push(shiftedRow);
        return shiftedRow;

    }

    getBack = () => {
        if (this.state.history.length > 1) {
            let oldHistory = [...this.state.history];
            oldHistory.pop();
            let newNumbers = oldHistory[this.state.history.length - 2];
            this.setState({numbers: newNumbers, history: oldHistory})
        }
    };

    shiftNumbers(shiftSide) {
        let sections = [...this.state.numbers];
        let needToTransform, direction;
        switch (shiftSide) {
            case 'ArrowUp':
                direction = true;
                needToTransform = true;
                this.setState(
                    {
                        numbers: this.shiftRow(sections, direction, needToTransform)
                    },
                    () => this.addNumberToSection());
                break;
            case 'ArrowDown':
                direction = false;
                needToTransform = true;
                this.setState(
                    {
                        numbers: this.shiftRow(sections, direction, needToTransform)
                    },
                    () => this.addNumberToSection());
                break;
            case 'ArrowLeft':
                direction = true;
                needToTransform = false;
                this.setState(
                    {
                        numbers: this.shiftRow(sections, direction, needToTransform)
                    },
                    () => this.addNumberToSection());
                break;
            case 'ArrowRight':
                direction = false;
                needToTransform = false;
                this.setState(
                    {
                        numbers: this.shiftRow(sections, direction, needToTransform)
                    },
                    () => this.addNumberToSection());
                break;
            default : {
                return 0;
            }
        }
    }

    newGame = () => {
        this.setState({
            numbers: [[0, 0, 0, 0,], [0, 0, 0, 0,], [0, 0, 0, 0], [0, 0, 0, 0]]
        }, () => {
            this.addNumberToSection();
        });

    };

    handlePressKey = (e) => {
        switch (e.key) {
            case 'ArrowUp':
                setTimeout(() => this.shiftNumbers('ArrowUp'), this.DELAY_AFTER_CLICK);
                break;
            case 'ArrowDown':
                setTimeout(() => this.shiftNumbers('ArrowDown'), this.DELAY_AFTER_CLICK);
                break;
            case 'ArrowLeft':
                setTimeout(() => this.shiftNumbers('ArrowLeft'), this.DELAY_AFTER_CLICK);
                break;
            case 'ArrowRight':
                setTimeout(() => this.shiftNumbers('ArrowRight'), this.DELAY_AFTER_CLICK);
                break;
            default: {
                break;
            }
        }
    };

    renderScene = () => {

        return this.state.numbers.map((row, index) => (
            <tr key={index}>
                {row.map((block, index) => (
                    block !== 0 ? (<td
                            className={s.oneBlock}
                            key={index}>
                            {block}
                        </td>) :
                        (<td
                            className={s[`oneBlock--unused`]}
                            key={index}>
                        </td>)
                ))}
            </tr>
        ))
    };


    render() {
        return (
            <div className={s.container} tabIndex={0} onKeyDown={this.handlePressKey}>
                <div className={s.main}>
                    <table className={s.gameWrap}>
                        {this.renderScene()}
                    </table>
                </div>
                <br/>
                <button type='button' onClick={this.newGame}>New Game</button>
                <button type='button' onClick={this.getBack}>Back</button>
            </div>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));


