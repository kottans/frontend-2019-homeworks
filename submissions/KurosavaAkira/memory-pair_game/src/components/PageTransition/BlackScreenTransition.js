import './BlackScreenTransition.sass';

const container = document.getElementById('container');

const blackScreenTransition = {
    blackScreenIn : '<div id="black-screen-in"></div>',
    blackScreenOut : '<div id="black-screen-out"></div>',
    toBlack : function () {
        container.insertAdjacentHTML('afterend', this.blackScreenIn);
        this.removeToBlack();
    },
    fromBlack : function () {
        container.insertAdjacentHTML('afterend', this.blackScreenOut);
        this.removeFromBlack();
    },
    removeToBlack : function () {
        const blackScreen = document.getElementById('black-screen-in');
        blackScreen.addEventListener('animationend', () => { blackScreen.remove() });
    },
    removeFromBlack : function () {
        const blackScreen = document.getElementById('black-screen-out');
        blackScreen.addEventListener('animationend', () => { blackScreen.remove() });
    }
}

export default blackScreenTransition;
