document.addEventListener("DOMContentLoaded", function(){
  var menu = document.getElementById('menu');
  var menuItems = document.querySelectorAll('.menu__item');
  var contentItems = document.querySelectorAll('.content__item');
  var activeMenu = menuItems[0];
  var activeContent = contentItems[0];

  var activeMobile = 0;
  if(document.documentElement.clientWidth <= 768){

      var leftArrow = document.createElement('div');
      menu.appendChild(leftArrow);
      leftArrow.className = 'leftArrow';
      leftArrow.style.display='none';

      var rightArrow = document.createElement('div');
      menu.appendChild(rightArrow);
      rightArrow.className = 'rightArrow';

      for(var i = 1; i < menuItems.length; i++){
        menuItems[i].style.display='none';
      };

      leftArrow.addEventListener('click', function(){
        console.log('left  ' + activeMobile);
        if(activeMobile > 0){
          menuItems[activeMobile].style.display='none';
          menuItems[activeMobile - 1].style.display='block';
          contentItems[activeMobile].style.display='none';
          contentItems[activeMobile - 1].style.display='block';
        }

        activeMobile--;

        if(activeMobile  === 0){
          leftArrow.style.display='none';
        }else{
          leftArrow.style.display='block';
        }
        if(activeMobile  === menuItems.length - 1){
          rightArrow.style.display='none';
      }else{
        rightArrow.style.display='block';
      }

    });

    rightArrow.addEventListener('click', function(){
      console.log('right   ' + activeMobile);
      if(activeMobile < menuItems.length - 1){
        menuItems[activeMobile].style.display='none';
        menuItems[activeMobile + 1].style.display='block';
        contentItems[activeMobile].style.display='none';
        contentItems[activeMobile + 1].style.display='block';
      }

      activeMobile++;

      if(activeMobile  === menuItems.length - 1){
        rightArrow.style.display='none';
      }else{
        rightArrow.style.display='block';
      }
      if(activeMobile  === 0){
        leftArrow.style.display='none';
      }else{
        leftArrow.style.display='block';
      }
    });

  }else{

  function menuClick(menu, content) {
    menu.classList.add('active');
    activeMenu.classList.remove('active');
    activeContent.style.display="none";
    content.style.display='block';
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
