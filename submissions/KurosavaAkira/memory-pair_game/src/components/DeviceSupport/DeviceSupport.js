import './DeviceSupport.sass';

const container = document.getElementById('container');

const device_not_supported = () => {
    return `<div id="device-not-supported">
                <p>Mobile screens not supported. Please, open the game on a large screen.</p>
            </div>`
}

const deviceSupport = () => {
    if (typeof window.orientation !== 'undefined') { 
        container.insertAdjacentHTML('afterend', device_not_supported());
        return false;
    }
    else return true;
}

export default deviceSupport;