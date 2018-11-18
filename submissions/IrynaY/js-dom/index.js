window.onload = function() {
  const menuList = document.getElementById("menu");
  const pageContent = document.getElementById("page_content")
  const menuContainer = document.getElementById("menu_container")
  const menuButton = document.getElementById("menu_btn")

  pageContent.innerHTML = `<img src="${content.cat.img}" class="pic">` + content.cat.content

  Object.keys(content).forEach(el => {
    const li = document.createElement("li")
    li.innerHTML = `${content[el].title}`
    li.addEventListener("click", function () {
      pageContent.innerHTML = `<img src="${content[el].img}" class="pic">` + content[el].content
    })
    menuList.appendChild(li)
  })

  menuButton.addEventListener("click", function () {
    menuContainer.style.display !== "flex" ?  
      menuContainer.style.display = "flex" : menuContainer.style.display = "none"    
  })

}