const FILES = ["./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png", "./img/5.png", "./img/6.png"]
const BODY = document.querySelector("body")
const CONGRATULATION = document.createElement("div")
const WON_STRING = document.createElement("p")
const RESTART = document.createElement("button")
const TIMEOUT = 700

function renderCongratulation(){
    CONGRATULATION.classList = "ho"
    WON_STRING.innerHTML = "🎉 YOU WON! 🎉"
    RESTART.id = "restart"
    RESTART.innerHTML = "Play again 🎅🏻"
    RESTART.addEventListener("click", () => {
        BODY.removeChild(CONGRATULATION)
        initGame()
    })
    CONGRATULATION.append(WON_STRING, RESTART)
    BODY.removeChild(document.getElementById("field"))
    BODY.append(CONGRATULATION)
}

function initGame(){
    let openCards = []

    const FIELD = document.createElement("div")
    FIELD.id = "field"

    let images = FILES.concat(FILES)
    images.sort(() => 0.5 - Math.random())
    images.forEach(imageSrc => {
        const IMAGE = document.createElement("img")
        IMAGE.classList = "card back"
        IMAGE.src = imageSrc

        const FRONT = document.createElement("div")
        FRONT.classList = "front"
        
        const FLIPPER = document.createElement("div")
        FLIPPER.classList = "flipper"

        FLIPPER.append(IMAGE, FRONT)
        FIELD.append(FLIPPER)
    })

    FIELD.addEventListener("click", (event) => {
        if(event.target.classList.value === "flipper" && openCards.length<2){
            event.target.classList.toggle("flip")
            openCards.push(event.target)
            if(openCards.length === 2)
                setTimeout(() => {
                    openCards[0].querySelector("img").src === openCards[1].querySelector("img").src ? 
                        openCards.forEach(element => element.querySelector("img").classList.toggle("hide")) :
                        openCards.forEach(element => element.classList.toggle("flip"))
                    openCards = []
                    if(document.getElementsByClassName("hide").length === images.length)
                        renderCongratulation()
                }, TIMEOUT)
        }
    })
    BODY.append(FIELD)
}

initGame()
