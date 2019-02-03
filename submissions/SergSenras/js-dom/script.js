var container;

function createMarkup(obj){
  var wrapper = document.createElement('div');
  for(var i = 0; i < obj.length; i++){
    var contentBox = document.createElement('div');
    var elem;
    for(var prop in obj[i]){
      contentBox.className = 'item__box';
      if(prop == 'name') {
        elem = document.createElement('h2');
        elem.innerText = obj[i][prop];
      } else if(prop == 'image') {
        elem = document.createElement('img');
        elem.className = 'img__common';
        elem.src = obj[i][prop];
      } else if(prop == 'content') {
        elem = document.createElement('p');
        elem.innerText = obj[i][prop];
      }
      contentBox.appendChild(elem);
    }
    wrapper.appendChild(contentBox);
  }
  return wrapper;
}

contentActivators = {
  'nav__main': createMarkup(main),
  'nav__plot': createMarkup(plot),
  'nav__towns': createMarkup(towns)
}

function clear(){
  container.innerHTML = '';
}

function displayContent(key){
  clear();

  container.appendChild(contentActivators[key]);
}

document.addEventListener('DOMContentLoaded', function(){
  container = document.getElementsByTagName('main')[0];
  var menu = document.getElementById('menu');
  var nav = document.getElementById('nav');

  // display content
  displayContent('nav__main');

  menu.addEventListener('click', function(e){
    nav.classList.toggle('open');
    e.stopPropagation();
  });

  var menuList = document.querySelector('.nav__list');
  menuList.addEventListener('click', function(event){
    displayContent(event.path[1].id);
  });
})

