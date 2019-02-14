import './BattlegroundBoard.sass';
import { cards } from './Cards';

const container = document.getElementById('container');

const board = () => {
    return `<div id="battleground-board" class="battleground-board-disable">${boardImage()}</div>`;
}

const boardImage = () => {
    return `<div class="battleground-board-image">${boardField()}</div>`;
}

const boardField = () => {
    return `<div class="battleground-board-field">${cards()}</div>`;
}

const render = () => {
    container.insertAdjacentHTML('beforeend', board());
}

export default render;
