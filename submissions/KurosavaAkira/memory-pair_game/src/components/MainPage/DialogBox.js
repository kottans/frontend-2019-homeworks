import './DialogBox.sass';
import Countdown from './Countdown';

const dialog = (avatar, dialog_box, button_ok) => {
    return `<div id="dialog">${avatar}${dialog_box}${button_ok}</div>`;
}

const dialog_box = (dialog_box_avatar_name, dialog_box_text) => {
    return `<div class="dialog-box">${dialog_box_avatar_name}${dialog_box_text}</div>`;
}
  
const dialog_box_avatar = (avatar) => {
    return `<div class="dialog-box-avatar" style="background-image: url(static/images/${avatar})"></div>`;
}

const dialog_box_avatar_name = (name) => {
    return `<div class="dialog-box-avatar-name">${name}</div>`;
}

const dialog_box_text = (text) => {
    return `<div class="dialog-box-text">${text}</div>`;
}

const button_ok = () => {
    return `<div class="dialog-box-button">ok</div>`;
}

const addButtonClickEvent = () => {
    const button = document.getElementsByClassName('dialog-box-button')[0];
    button.addEventListener('click', () => { applyButton() });
}

const applyButton = () => {
    const dialog = document.getElementById('dialog');
    const battleground_board = document.getElementById('battleground-board'); 
    dialog.classList.add('dialog-hide');
    dialog.addEventListener('transitionend', () => { 
        dialog.remove();
        Countdown();
        setTimeout(() => {
            battleground_board.classList.add('battleground-board-show');
            battleground_board.addEventListener('transitionend', () => { 
                battleground_board.classList.add('battleground-board-rebound');
            });
        }, 3000);
    });
}

const Render = (avatar, name, text) => {
    const game_scene = document.getElementById('game-scene');
    const render_html = dialog(dialog_box_avatar(avatar), dialog_box(dialog_box_avatar_name(name), dialog_box_text(text)), button_ok());
    game_scene.insertAdjacentHTML('beforeend', render_html);
    addButtonClickEvent();
}

export default Render;