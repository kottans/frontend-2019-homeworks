import './BattlegroundStats.sass';

const container = document.getElementById('container');

const stats = () => {
    return `<div id="battleground-stats">${statsImage()}</div>`;
}

const statsImage = () => {
    return `<div class="battleground-stats-image"></div>`;
}

const render = () => {
    container.insertAdjacentHTML('beforeend', stats());
}

export default render;
