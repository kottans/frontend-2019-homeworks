const menuBtn = document.querySelector('.btn-menu');
const navList = document.querySelector('.nav-list');
const content = document.querySelector('.content');
const menuItems = document.querySelectorAll('.nav-item');
const logo = document.querySelector('.logo');

logo.addEventListener('click', function() {
  if(menuBtn.classList.contains('active')) {
    menuBtn.classList.remove('active');
  }
  if(navList.classList.contains('active')) {
    navList.classList.remove('active');
  }
  const elem = content.querySelector("img");
  if(elem) {
    elem.remove();
  }
});

menuBtn.addEventListener('click', function(e) {
  menuBtn.classList.toggle('active');
  navList.classList.toggle('active');
});

navList.addEventListener('click', function(e) {
  let listItem = e.target;
  if (listItem.nodeName === 'LI') {
    const indexOfActiveItem = getIndexOfActiveItem(listItem);
    const img = getImage(indexOfActiveItem, data);
    if(img) {
      content.innerHTML = '<img src="'+ img + '" />';
    }
  }
});

function getImage(indexOfActiveItem, data) {
  let img;
  const arr = data.find(item => { 
    if (item.id === indexOfActiveItem) {
      img = item.img;
    };
  });
  return img;
}

function getIndexOfActiveItem(targetItem) {
  const arr = [...menuItems];
  return arr.indexOf(targetItem);
}


