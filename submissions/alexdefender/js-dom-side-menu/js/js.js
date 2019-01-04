var contentArr = [{
  nameClassFromArr: "menu-item-1",
  contentGoods: "<img class=\"img-content\" src=\"img/01.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  nameClassFromArr: "menu-item-2",
  contentGoods: "<img class=\"img-content\" src=\"img/02.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  nameClassFromArr: "menu-item-3",
  contentGoods: "<img class=\"img-content\" src=\"img/03.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  nameClassFromArr: "menu-item-4",
  contentGoods: "<img class=\"img-content\" src=\"img/04.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}, {
  nameClassFromArr: "menu-item-5",
  contentGoods: "<img class=\"img-content\" src=\"img/05.jpg\"><p>Главное преимущество изделия – его экономичность по сравнению с вертикальным озеленением на всю стену. </p><p>Достаточно 1–2 панелей на стене, чтобы полностью обновить интерьер комнаты, сделать его более актуальным и трендовым.</p>",
}]

document.querySelector(".menu-list").addEventListener('click', function (e) {
  if (e.target && e.target.nodeName === "LI") {
    switch (e.target.className) {
      case "menu-item-1":
        showContent("menu-item-1");
        break;
      case "menu-item-2":
        showContent("menu-item-2");
        break;
      case "menu-item-3":
        showContent("menu-item-3");
        break;
      case "menu-item-4":
        showContent("menu-item-4");
        break;
      case "menu-item-5":
        showContent("menu-item-5");
        break;
    }
  }
});

function showContent(nameClass) {
  let element = document.querySelector("#content");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  let newDiv = document.createElement('div');
  element.className = "content content-style";
  for (let index in contentArr) {
    if (contentArr[index].nameClassFromArr === nameClass) {
      newDiv.innerHTML = contentArr[index].contentGoods;
    }
  }
 
  element.appendChild(newDiv);
}