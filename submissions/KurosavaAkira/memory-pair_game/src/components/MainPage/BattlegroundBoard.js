import './BattlegroundBoard.sass';
import { cards } from './Cards';

const container = document.getElementById('container');

const board = () => {
    return `<div id="battleground-board" class="battleground-board-disable">${board_image()}</div>`;
}

const board_image = () => {
    return `<div class="battleground-board-image">${board_field()}</div>`;
}

const board_field = () => {
    return `<div class="battleground-board-field">${cards()}</div>`;
}

const Render = () => {
    container.insertAdjacentHTML('beforeend', board());
}

export default Render;