import './DeviceSupport.sass';

const container = document.getElementById('container');

const deviceNotSupported = () => {
    return `<div id="device-not-supported">
                <p>Mobile screens not supported. Please, open the game on a large screen.</p>
            </div>`
}

const deviceSupport = () => {
    if (typeof window.orientation !== 'undefined') { 
        container.insertAdjacentHTML('afterend', deviceNotSupported());
        return false;
    }
    else return true;
}

export default deviceSupport;
