window.onload = function () {
  const container = document.getElementById("container");
  var content = document.getElementById("content");
  var menu = document.getElementById("menu");

  const x = document.createElement("h1");
  x.textContent = "Oboe World";
  document.body.insertBefore(x, document.body.firstChild);

  data.forEach(function (value) {  
    const paragraph = document.createElement("p");
    paragraph.id = value.id;
    paragraph.innerHTML = value.id;
    container.appendChild(paragraph);
  });

  container.addEventListener("click", function (el) {
    if(el.target.tagName != "p") {
       var currentOboe = data.find(value => value.id === el.target.id);
  }
    content.innerHTML = currentOboe.text + `<img src = "${currentOboe.img}" class = "img">`; 
  })

  menu.addEventListener("click", function (e) {
    container.classList.toggle("open");
    e.stopPropagation();
  })
};