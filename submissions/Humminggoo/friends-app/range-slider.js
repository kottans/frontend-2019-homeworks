document.addEventListener('DOMContentLoaded', function(){
    let sliderSections = document.querySelectorAll(".custom-range");
    sliderSections.forEach(i => {
        i.oninput = getVals;
        i.oninput();
    });
});
function getVals(){
    let slides = document.querySelectorAll(".custom-range");
    let [slide1, slide2] = [slides[0].value, slides[1].value];
    const displayElement = document.querySelector(".rangeValues");
    displayElement.innerHTML = slide1 + " - " + slide2;
}
