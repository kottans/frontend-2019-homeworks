const FILES = ["./img/1.png", "./img/2.png", "./img/3.png", "./img/4.png", "./img/5.png", "./img/6.png"]
const BODY = document.querySelector("body")
const CONGRATULATION = document.createElement("div")
const WON_STRING = document.createElement("p")
const RESTART = document.createElement("button")

function renderCongratulation(){
    CONGRATULATION.classList = "ho"
    WON_STRING.innerHTML = "🎉 YOU WON! 🎉"
    RESTART.id = "restart"
    RESTART.innerHTML = "Play again 🎅🏻"
    RESTART.onclick = () => {
        BODY.removeChild(CONGRATULATION)
        initGame()
    }
    CONGRATULATION.appendChild(WON_STRING)
    CONGRATULATION.appendChild(RESTART)
    BODY.removeChild(document.getElementById("field"))
    BODY.appendChild(CONGRATULATION)
}

function initGame(){
    const FIELD = document.createElement("div")
    FIELD.id = "field"
    
    let images = FILES.concat(FILES)
    images.sort(() => 0.5 - Math.random())

    let openCards = []

    for(let i=0; i<12; i++){
        const IMAGE = document.createElement("img")
        IMAGE.classList = "back"
        IMAGE.src = images.shift()

        const FRONT = document.createElement("div")
        FRONT.classList = "front"
        
        const FLIPPER = document.createElement("div")
        FLIPPER.classList = "flipper"
        FLIPPER.addEventListener("click", (event) => {
            if(event.target.tagName === "DIV" && openCards.length<2){
                FLIPPER.classList.toggle("flip")
                openCards.push(FLIPPER)
                if(openCards.length === 2)
                    setTimeout(() => {
                        openCards[0].children[0].src === openCards[1].children[0].src ? 
                            openCards.forEach(element => element.children[0].classList.toggle("hide")) :
                            openCards.forEach(element => element.classList.toggle("flip"))
                        openCards = []
                        if(document.getElementsByClassName("hide").length === 12)
                            renderCongratulation()
                    }, 700)
            }
        })
        FLIPPER.appendChild(IMAGE)
        FLIPPER.appendChild(FRONT)
        FIELD.appendChild(FLIPPER)
    }
    BODY.appendChild(FIELD)
}

initGame()