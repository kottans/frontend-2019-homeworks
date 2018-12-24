document.addEventListener("DOMContentLoaded", ready);

//start function
function ready() {
    var contents = document.getElementById('content-wrapper').children;
    //event delegation to reduce redundancy
    var ul = document.querySelector('.menu');
    ul.addEventListener('click',changeContent);
}



function changeContent(event) {
    if (!event.target.matches('li')) return;    
    var element = event.target;
    //disable all contents
    var contents = document.querySelectorAll('.active-content');
    contents.forEach(element => {
        element.classList.remove('active-content');
    });

    //disable active classes
    var active = document.querySelectorAll('.active');
    active.forEach(el=> {
        var imgAfter = document.querySelector(".active img.after");
        var imgBefore = document.querySelector(".active img.before");
        imgAfter.classList.toggle('active-img');
        imgBefore.classList.toggle('active-img');
        el.classList.toggle('active');
    });

    //enable content
    
    var content = document.querySelector("#content-wrapper ."+element.className);
    content.classList.toggle('active-content');
    element.classList.toggle('active');
    var imgAfter = document.querySelector(".active img.after");
    var imgBefore = document.querySelector(".active img.before");

    imgAfter.classList.toggle('active-img');
    imgBefore.classList.toggle('active-img');


}
