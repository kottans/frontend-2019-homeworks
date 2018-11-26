document.addEventListener("DOMContentLoaded", function(){
  const menu = document.getElementById('menu');
  const content = document.getElementById('content');
  var menuItems = [];
  var contentItems = [];

//наполняю страницу
  for(var index in data){
    //меню
    let itemM = document.createElement('div');
    itemM.classList.add('menu__item');
    itemM.innerHTML=data[index]["menu"];
    menu.appendChild(itemM);
    menuItems.push(itemM);
    //контент
    let itemC = document.createElement('div');
    itemC.classList.add("content__item", data[index]['contentClass']);
    let childC = document.createElement('div');
    childC.classList.add("content__" + data[index]['contentClass']);
    childC.innerHTML=data[index]["text"];
    itemC.appendChild(childC);
    content.appendChild(itemC);
    contentItems.push(itemC);
  }

var activeMenu = menuItems[0];
var activeContent = contentItems[0];

for(var i = 1; i < contentItems.length; i++){
  contentItems[i].classList.add('hidden');
}

//номер активного меню (и контента)
  var mobileActiveItem = 0;
  //логика меню на мобильных девайсах
  if(document.documentElement.clientWidth <= 768){

      let leftArrow = document.createElement('div');
      menu.appendChild(leftArrow);
      leftArrow.className = 'leftArrow';
      leftArrow.classList.add('hidden');

      let rightArrow = document.createElement('div');
      menu.appendChild(rightArrow);
      rightArrow.className = 'rightArrow';

      for(var i = 1; i < menuItems.length; i++){
        menuItems[i].classList.add('hidden');
      };

      leftArrow.addEventListener('click', function(){

        if(mobileActiveItem > 0){
          menuItems[mobileActiveItem].classList.add('hidden');
          menuItems[mobileActiveItem - 1].classList.remove('hidden');
          contentItems[mobileActiveItem].classList.add('hidden');
          contentItems[mobileActiveItem - 1].classList.remove('hidden');
        }

        mobileActiveItem--;
        //на первом слайде убираю стрелку влево, на последнем стрелку вправо
        mobileActiveItem === 0 ? leftArrow.classList.add('hidden') : leftArrow.classList.remove('hidden');
        mobileActiveItem  === menuItems.length - 1 ? rightArrow.classList.add('hidden') : rightArrow.classList.remove('hidden');


    });

    rightArrow.addEventListener('click', function(){
  
      if(mobileActiveItem < menuItems.length - 1){
        menuItems[mobileActiveItem].classList.add('hidden');
        menuItems[mobileActiveItem + 1].classList.remove('hidden');
        contentItems[mobileActiveItem].classList.add('hidden');
        contentItems[mobileActiveItem + 1].classList.remove('hidden');
      }

      mobileActiveItem++;
      //на первом слайде убираю стрелку влево, на последнем стрелку вправо
      mobileActiveItem  === menuItems.length - 1 ? rightArrow.classList.add('hidden') : rightArrow.classList.remove('hidden') ;
      mobileActiveItem  === 0 ? leftArrow.classList.add('hidden') : leftArrow.classList.remove('hidden') ;

    });
//меню на десктопе
  }else{

  function menuClick(menu, content) {
    menu.classList.add('active');
    activeMenu.classList.remove('active');
    activeContent.classList.add('hidden');
    content.classList.remove('hidden');
    activeMenu = menu;
    activeContent = content;
  };

  for (var i = 0; i < menuItems.length; i++){
    let menu = menuItems[i];
    let content = contentItems[i];
    menu.addEventListener( 'click', function(){ menuClick(menu, content); });
  };
};
});
