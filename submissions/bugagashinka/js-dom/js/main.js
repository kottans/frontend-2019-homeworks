window.onload = init();

function init() {
  const DATA_URL = 'https://api.myjson.com/bins/8m5bg';

  let curItem = null;
  const menuFragment = document.createDocumentFragment();
  const menuButton = document.getElementById('menu-button');
  const sideMenu = document.getElementById('side-menu');
  const main = document.querySelector('main');

  getData();

  menuButton.addEventListener('click', e => {
    sideMenu.classList.toggle('open');
    e.stopPropagation();
  });

  main.addEventListener('click', () => {
    sideMenu.classList.remove('open');
  });

  function createElement(element) {
    return document.createElement(element);
  }

  function createImgContent(img) {
    const imgContent = createElement('div');
    imgContent.classList.add('responsive');

    const gallery = createElement('div');
    gallery.classList.add('gallery');
    imgContent.appendChild(gallery);

    const link = createElement('a');
    link.setAttribute('href', img.link);
    gallery.append(link);

    const image = createElement('img');
    image.setAttribute('class', 'min-image');
    image.setAttribute('src', img.min);
    image.setAttribute('alt', '');
    link.append(image);

    const originalImg = new Image();
    originalImg.src = img.min;
    originalImg.onload = function() {
      image.classList.remove('min-image');
      image.setAttribute('src', img.path);
      return image;
    };

    const desc = createElement('div');
    desc.classList.add('desc');
    desc.textContent = img.desc;
    link.appendChild(desc);
    return imgContent;
  }

  function createItemContent(itemContent) {
    const content = createElement('div');
    content.classList.add('content');

    itemContent.images.forEach(item => {
      content.appendChild(createImgContent(item));

      const text = createElement('p');
      text.textContent = item.text;
      content.appendChild(text);
    });

    let prevCont = document.querySelector('.content');
    if (prevCont) {
      prevCont.replaceWith(content);
    } else {
      main.appendChild(content);
    }
  }

  function createMenuItem(item, showContent) {
    const itemTitle = createElement('li');
    itemTitle.textContent = item.title;

    itemTitle.addEventListener('mouseover', () => {
      if (curItem === item) return;

      createItemContent(item.content);
      curItem = item;
    });

    if (showContent) {
      createItemContent(item.content);
      curItem = item;
    }
    return itemTitle;
  }

  function getData() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let dataArray = JSON.parse(this.responseText);
        addContent(dataArray);
      }
    };
    xmlHttp.open('GET', DATA_URL, true);
    xmlHttp.send();
  }

  function addContent(dataArray) {
    dataArray.forEach((item, index) => {
      menuFragment.appendChild(createMenuItem(item, !index));
    });

    menuFragment.appendChild(createElement('ul'));
    sideMenu.appendChild(menuFragment);
  }
}
