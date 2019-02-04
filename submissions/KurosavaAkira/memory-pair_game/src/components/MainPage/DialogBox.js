import './DialogBox.sass';
import countdown from './Countdown';

const dialog = (avatar, dialogBox, buttonOk) => {
    return `<div id="dialog">${avatar}${dialogBox}${buttonOk}</div>`;
}

const dialogBox = (dialogBoxAvatarName, dialogBoxText) => {
    return `<div class="dialog-box">${dialogBoxAvatarName}${dialogBoxText}</div>`;
}
  
const dialogBox_avatar = (avatar) => {
    return `<div class="dialog-box-avatar" style="background-image: url(static/images/${avatar})"></div>`;
}

const dialogBoxAvatarName = (name) => {
    return `<div class="dialog-box-avatar-name">${name}</div>`;
}

const dialogBoxText = (text) => {
    return `<div class="dialog-box-text">${text}</div>`;
}

const buttonOk = () => {
    return `<div class="dialog-box-button">ok</div>`;
}

const addButtonClickEvent = () => {
    const button = document.querySelector('.dialog-box-button');
    button.addEventListener('click', () => { applyButton() });
}

const applyButton = () => {
    const dialog = document.getElementById('dialog');
    const battlegroundBoard = document.getElementById('battleground-board'); 
    dialog.classList.add('dialog-hide');
    dialog.addEventListener('transitionend', () => { 
        dialog.remove();
        countdown();
        setTimeout(() => {
            battlegroundBoard.classList.add('battleground-board-show');
            battlegroundBoard.addEventListener('transitionend', () => { 
                battlegroundBoard.classList.add('battleground-board-rebound');
            });
        }, 3000);
    });
}

const render = (avatar, name, text) => {
    const gameScene = document.getElementById('game-scene');
    const renderHtml = dialog(dialogBox_avatar(avatar), dialogBox(dialogBoxAvatarName(name), dialogBoxText(text)), buttonOk());
    gameScene.insertAdjacentHTML('beforeend', renderHtml);
    addButtonClickEvent();
}

export default render;
