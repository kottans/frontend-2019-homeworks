window.onload = () => {
    router();
    controller();
}

let mobileMenu = () => {
    console.log('click');
    const x = document.getElementById('menu');
    if (x.className === '') {
        x.classList.add('mobile-active');
    } else {
        x.classList.remove('mobile-active');
    }
}