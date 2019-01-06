import './FullScreenVideo.sass';

const videoHtml = (file_name, loop) => {
    return `<video autoplay muted ${loop} id="full-screen-video">
                <source src="static/media-files/video/${file_name}" type="video/mp4">
            </video>`
}

const renderFullScreenVideo = (file_name, loop = '') => {
    const container = document.getElementById('container');
    return container.insertAdjacentHTML('beforeend', videoHtml(file_name, loop));
}

const changeFullScreenVideo = (file_name, loop = '') => {
    const full_screen_video = document.getElementById('full-screen-video');
    full_screen_video.src = `static/media-files/video/${file_name}`;
    full_screen_video.loop = loop == 'loop' ? true : false;
    full_screen_video.play();
}

export {renderFullScreenVideo, changeFullScreenVideo};