let previousItem = 0;
let menuItems = [{name:'topic1', text: 'text1'},
    {name:'topic2', text: 'text2'},
    {name:'topic3', text: 'text3'},
    {name:'topic4', text:   'text4'}];
let elementMenu = document.getElementById('menu');
let menuList = menuItems.map((item,index) => `<li class="itemMenu" id="item${index}" itemNumber=${index}>${item.name}</li>`).join(' ');
elementMenu.innerHTML = menuList;
elementMenu.addEventListener('click', (event) =>{
    let target = event.target;
    if (!(target.className !== 'itemMenu' || target.className !== 'itemMenu active')) return;
    document.getElementById(`item${previousItem}`).className = 'itemMenu';
    target.className = 'itemMenu active';
    previousItem = target.getAttribute('itemNumber');
    document.getElementById('main').innerText = menuItems[previousItem]['text'];
});
document.getElementById('item0').click();
