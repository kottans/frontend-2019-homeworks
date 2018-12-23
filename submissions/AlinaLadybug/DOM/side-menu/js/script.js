document.addEventListener("DOMContentLoaded", ready);

//start function
function ready() {
    var contents = document.getElementById('content-wrapper').children;
    
    var li_elements = Array.from(document.getElementsByClassName('menu')[0].children);
    li_elements.forEach(element => {
        element.addEventListener("mouseover", function () { hover(element) });
        element.addEventListener("mouseout", function () { unhover(element) });
        element.addEventListener("click", function () { changeContent(element) });
    });
}
function hover(element) {
    var image = document.getElementsByClassName(element.className)[0].children[0];
    var oldSrc = image.getAttribute('src');
    image.setAttribute('src', oldSrc.replace('before', 'after'));
}
function unhover(element) {
    if (element.classList.contains('active')) {
        return;
    }
    var image = document.querySelector("."+element.classList[0]+" img");
    var oldSrc = image.getAttribute('src');
    image.setAttribute('src', oldSrc.replace('after', 'before'));
}
////////////////////////////


function changeContent(element) {
    //disable all contents
    var contents = Array.from(document.getElementById('content-wrapper').children);
    contents.forEach(element => {
        element.classList.remove('active-content');
    });

    //disable active classes
    var active = Array.from(document.getElementsByClassName('active'));
    active.forEach(el=> {
        var image = document.querySelector("."+el.classList[0]+" img");
        var oldSrc = image.getAttribute('src');
        image.setAttribute('src', oldSrc.replace('after', 'before'));
        el.classList.toggle('active');
    });

    hover(element);
    //enable content
    
    var content = document.querySelector("#content-wrapper ."+element.className);
    content.classList.toggle('active-content');
    element.classList.toggle('active');
}
