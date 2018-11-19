window.onload = function() {
  const pageContent = document.getElementById("page_content")
  const menuButton = document.getElementById("menu_btn")
  const menuContainer = document.getElementById("menu_container")
  const ul = document.createElement("ul")

  ul.id = "menu"
  сharacters.forEach(el => {
    const li = document.createElement("li")
    li.innerHTML = `${el.id}`
    ul.appendChild(li)
  })
  menuContainer.appendChild(ul)

  ul.addEventListener("click", (evt) => {
    if (evt.target.tagName != "LI") return
    let element = сharacters.filter(el => {return el.id === evt.target.textContent})
    pageContent.innerHTML = `<img src="${element[0].img}" class="pic">` + element[0].content
  })

  menuButton.addEventListener("click", () => {
    ul.className === "visible" ? ul.className = "disable" : ul.className = "visible"
  })

  pageContent.innerHTML = `<img src="${сharacters[0].img}" class="pic">` + сharacters[0].content
}
