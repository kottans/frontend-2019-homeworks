import './GameScene.sass';

const container = document.getElementById('container');

const game_scene_html = () => {
    return `<div id="game-scene"></div>`
}
  
const Render = () => {
    return container.insertAdjacentHTML('beforeend', game_scene_html());
}

export default Render;