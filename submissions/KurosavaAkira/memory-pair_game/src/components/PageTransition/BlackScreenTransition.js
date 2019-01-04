import './BlackScreenTransition.sass';

const container = document.getElementById('container');

const BlackScreenTransition = {
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
        const black_screen = document.getElementById('black-screen-in');
        black_screen.addEventListener('animationend', () => { black_screen.remove() });
    },
    removeFromBlack : function () {
        const black_screen = document.getElementById('black-screen-out');
        black_screen.addEventListener('animationend', () => { black_screen.remove() });
    }
}

export default BlackScreenTransition;