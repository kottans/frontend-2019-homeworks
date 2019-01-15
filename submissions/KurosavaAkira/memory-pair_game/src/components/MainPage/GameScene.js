import './GameScene.sass';

const container = document.getElementById('container');

const gameSceneHtml = () => {
    return `<div id="game-scene"></div>`
}
  
const render = () => {
    return container.insertAdjacentHTML('beforeend', gameSceneHtml());
}

export default render;
