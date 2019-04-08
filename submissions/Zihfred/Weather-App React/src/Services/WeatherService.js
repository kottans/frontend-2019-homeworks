import images from "../imagesObj";

export function roundTemp(temp) {
    return temp > 0 ? '+' +Math.round(temp): Math.round(temp);
}

export function getIconByStatus(sunStatus){
    switch (sunStatus) {
        case 'Clear':
            return images.Q32;

        case 'Clouds':
            return images.Q9;

        case 'Dust':
            return images.Q1;

        case 'Rain':
            return images.Q4;

        case 'Snow':
            return images.Q11;

    }
    return
}
