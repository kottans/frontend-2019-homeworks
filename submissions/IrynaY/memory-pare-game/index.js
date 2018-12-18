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
            flipContainer.classList = "flip-container"
            const img = document.createElement("img")
            img.src = images.shift()
            img.classList = "front"
            const back = document.createElement("div")
            back.classList = "back"
            flipContainer.appendChild(img)
            flipContainer.appendChild(back)
            td.appendChild(flipContainer)
            tr.appendChild(td)
        }
        table.appendChild(tr)
    }

    table.addEventListener("click", (evt) => {
        if(evt.target.tagName === "DIV"){
            evt.target.classList.toggle("flip")
        }
    })
    
    pageContainer.appendChild(table)
}