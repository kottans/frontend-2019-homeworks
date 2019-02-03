let previousItem = 0;
let menuItems = [{name:'topic1', text: 'text1'},
    {name:'topic2', text: 'text2'},
    {name:'topic3', text: 'text3'},
    {name:'topic4', text:   'text4'}];
let elementMenu = document.getElementById('menu');
let menuList = menuItems.map((item,index) => `<li class="itemMenu"  item=${index}>${item.name}</li>`).join(' ');
elementMenu.innerHTML = menuList;
elementMenu.addEventListener('click', (event) =>{
    let target = event.target;
    let targetClass = target.classList;
    if (!targetClass.contains('itemMenu')) return;
    document.querySelector(`li[item="${previousItem}"]`).className = 'itemMenu';
    targetClass.toggle('active');
    previousItem = target.getAttribute('item');
    document.getElementById('main').innerText = menuItems[+previousItem]['text'];
});
document.querySelector('li[item="0"]').click();
