import './FullScreenVideo.sass';

const videoHtml = (fileName, loop) => {
    return `<video autoplay muted ${loop} id="full-screen-video">
                <source src="static/media-files/video/${fileName}" type="video/mp4">
            </video>`
}

const renderFullScreenVideo = (fileName, loop = '') => {
    const container = document.getElementById('container');
    return container.insertAdjacentHTML('beforeend', videoHtml(fileName, loop));
}

const changeFullScreenVideo = (fileName, loop = '') => {
    const fullScreenVideo = document.getElementById('full-screen-video');
    fullScreenVideo.src = `static/media-files/video/${fileName}`;
    fullScreenVideo.loop = loop == 'loop' ? true : false;
    fullScreenVideo.play();
}

export {renderFullScreenVideo, changeFullScreenVideo};
