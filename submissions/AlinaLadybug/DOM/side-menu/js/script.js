document.addEventListener("DOMContentLoaded", ready);

//start function
function ready() {
    var contents = document.getElementById('content-wrapper').children;
    for (var i = 1; i < contents.length; i++) {
        contents[i].style.display = "none";
    }
    contents[0].style.display = "block";

}

//hover & unhover nav elements
function hover(element) {
    var image = document.getElementsByClassName(element.className)[0].children[0];
    var oldSrc = image.getAttribute('src');
    image.setAttribute('src', oldSrc.replace('before', 'after'));
}
function unhover(element) {
    if (element.className.includes('active')) {
        return;
    }
    var image = document.getElementsByClassName(element.className)[0].children[0];
    var oldSrc = image.getAttribute('src');
    image.setAttribute('src', oldSrc.replace('after', 'before'));
}
////////////////////////////


function changeContent(element) {
    //disable all contents
    var contents = document.getElementById('content-wrapper').children;
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    //disable active classes
    var active = document.getElementsByClassName('active');
    for (var i = 0; i < active.length; ++i) {
        var className = active[i].className.split(' ')[0];
        var image = active[i].children[0];
        var oldSrc = image.getAttribute('src');
        image.setAttribute('src', oldSrc.replace('after', 'before'));
        active[i].className = className;
    }

    hover(element);
    //enable content
    document.getElementById(element.className).style.display = "block";

    element.className = element.className + ' active';
}