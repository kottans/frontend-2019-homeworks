window.onload = function() {
    let images = [
        "./img/1.png",
        "./img/2.png",
        "./img/3.png",
        "./img/4.png",
        "./img/5.png",
        "./img/6.png"
    ]
    let openCards = [];

    const pageContainer = document.getElementById("container")
    const table = document.createElement("table")

    images = images.concat(images)
    images.sort(function() { return 0.5 - Math.random() })
        
    for(let i=0; i<3; i++){
        const tr = document.createElement("tr")
        for(let j=0; j<4; j++){
            const td = document.createElement("td")
            const flipContainer = document.createElement("div")
            // flipContainer.   ontouchstart="this.classList.toggle('hover')"
            const flipper = document.createElement("div")
            const front = document.createElement("div")
            const back = document.createElement("div")
            const img = document.createElement("img")

            flipContainer.className = "flip-container"
            flipper.className = "flipper"
            front.className = "front"
            back.className = "back"

            img.src = images.shift()

            back.appendChild(img)
            flipper.appendChild(front)
            flipper.appendChild(back)
            flipContainer.appendChild(flipper)

            td.appendChild(flipContainer)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }


    table.addEventListener("click", (evt) => {
        console.log(evt.target.target)
        if(evt.target.tagName === "DIV"){
            evt.target.classList.toggle("show")
            // openCards.push(evt.target.innerHTML)
            // if(openCards.length === 2){
            //     if(openCards[0].localeCompare(openCards[1]) === 0)
            //         console.log("!!SDFSDFS", openCards[0], )
            //     openCards = []
            // }
        }
    })
    
    pageContainer.appendChild(table)



}