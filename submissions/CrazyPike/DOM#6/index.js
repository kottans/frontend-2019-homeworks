let previousItem = 0;
let menuItems = [{name:'topic1', text: 'text1'},
    {name:'topic2', text: 'text2'},
    {name:'topic3', text: 'text3'},
    {name:'topic4', text:   'text4'}];
let elementMenu = document.getElementById('menu');
elementMenu.innerHTML = menuItems.map((item,index) => `<div class="itemMenu" id="item${index}">${item.name}</div>`).join(' ');
elementMenu.addEventListener('click', (event) =>{
    let target = event.target;
    if (!(target.className !== 'itemMenu' || target.className !== 'itemMenu active')) return;
    document.getElementById(`item${previousItem}`).className = 'itemMenu';
    target.className = 'itemMenu active';
    previousItem = target.id.match(/\d+/g)[0];
    document.getElementById('main').innerText = menuItems[target.id.match(/\d+/g)[0]]['text'];
});
document.getElementById('item0').click();