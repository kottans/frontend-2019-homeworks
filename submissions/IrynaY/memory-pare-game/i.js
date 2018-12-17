window.onload = function() {
    console.log("ksk")

    const flipper = document.getElementById('test')
    flipper.addEventListener("click", (evt) => {
            console.log(evt.target.tagName)
            flipper.classList.toggle("show")
    })


}