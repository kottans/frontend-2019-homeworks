var contentArr = [{
  contentGoods: "<img src=\"img/01.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  contentGoods: "<img src=\"img/02.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  contentGoods: "<img src=\"img/03.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  contentGoods: "<img src=\"img/04.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  contentGoods: "<img src=\"img/05.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}]

var menuItem1 = document.querySelector('.menu-item-1');
menuItem1.addEventListener('click', function () {
  let element = document.querySelector(".content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let newDiv = document.createElement('div');
  applyStyleCss(newDiv);
  newDiv.innerHTML = contentArr[0].contentGoods;
  let chooseContent = document.querySelector('.content');
  chooseContent.appendChild(newDiv);
});

var menuItem2 = document.querySelector('.menu-item-2');
menuItem2.addEventListener('click', function () {
  let element = document.querySelector(".content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let newDiv = document.createElement('div');
  applyStyleCss(newDiv);
  newDiv.innerHTML = contentArr[1].contentGoods;
  let chooseContent = document.querySelector('.content');
  chooseContent.appendChild(newDiv);
});

var menuItem3 = document.querySelector('.menu-item-3');
menuItem3.addEventListener('click', function () {
  let element = document.querySelector(".content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let newDiv = document.createElement('div');
  applyStyleCss(newDiv);
  newDiv.innerHTML = contentArr[2].contentGoods;
  let chooseContent = document.querySelector('.content');
  chooseContent.appendChild(newDiv);
});

var menuItem4 = document.querySelector('.menu-item-4');
menuItem4.addEventListener('click', function () {
  let element = document.querySelector(".content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let newDiv = document.createElement('div');
  applyStyleCss(newDiv);
  newDiv.innerHTML = contentArr[3].contentGoods;
  let chooseContent = document.querySelector('.content');
  chooseContent.appendChild(newDiv);
});

var menuItem5 = document.querySelector('.menu-item-5');
menuItem5.addEventListener('click', function () {
  let element = document.querySelector(".content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  let newDiv = document.createElement('div');
  applyStyleCss(newDiv);
  newDiv.innerHTML = contentArr[4].contentGoods;
  let chooseContent = document.querySelector('.content');
  chooseContent.appendChild(newDiv);
});

function applyStyleCss(element) {
  element.style.border = "solid";
  element.style.borderColor = "burlywood";
  element.style.padding = "20px 20px 20px 20px";
  element.style.margin = "-10px 20px 20px -10px";
  element.style.transition = "2s";
}



