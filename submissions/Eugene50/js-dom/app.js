window.onload = function () {
  const container  = document.getElementById("container");
  var content = document.getElementById("content");
  var menu = document.getElementById("menu");


const x = document.createElement("h1");
x.textContent = 'Oboe World';
document.body.insertBefore(x, document.body.firstChild);

data.forEach(function (index) {

  const div = document.createElement("p");
div.innerHTML = index.name;
container.appendChild(div);
});

container.addEventListener('click', function (el) {

if(el.target.tagName != 'p') {
 var currentOboe = data.find(index => index.name === el.target.textContent)
}
content.innerHTML = currentOboe.text + `<img src = "${currentOboe.img}" class = "img">`; 
})

  menu.addEventListener("click", function (e) {
  container.classList.toggle('open');
  e.stopPropagation();

 })

};

