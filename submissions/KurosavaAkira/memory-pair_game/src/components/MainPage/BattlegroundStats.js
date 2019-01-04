import './BattlegroundStats.sass';

const container = document.getElementById('container');

const stats = () => {
    return `<div id="battleground-stats">${stats_image()}</div>`;
}

const stats_image = () => {
    return `<div class="battleground-stats-image"></div>`;
}

const Render = () => {
    container.insertAdjacentHTML('beforeend', stats());
}

export default Render;