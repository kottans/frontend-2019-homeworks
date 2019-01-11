class Slider {
    constructor(){
        this.sliderSections = document.querySelectorAll(".custom-range");
        this.range = document.querySelector(".rangeValues");
    }
    handleInput(){
        this.sliderSections.forEach(i => {
            i.oninput = () => this.getVals();
            i.oninput();
        })
    }
    getVals() {
        let [slide1, slide2] = [this.sliderSections[0].value, this.sliderSections[1].value];
        this.range.innerHTML = slide1 + " - " + slide2;
    }
}
export default Slider;
