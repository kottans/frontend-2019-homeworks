import  './css-reset.css';
import './header.css';
import  './menu.css';
import  './content.css';
import  './media-desktop.css';
import * as data from './task.json';
const word = data.projects;
console.log(word); // output 'testing'

document.addEventListener("DOMContentLoaded", handleDOM);

function handleDOM(){
    let menuBtn = document.getElementById('menu-btn'),
        menu = document.getElementById('menu'),
        menuItems = document.getElementsByClassName('nav-item'),
        contentContainer = document.getElementById('content');
//for the first load
    showContent(data.projects[0].name);
    menuItems[0].classList.add('nav-item-clicked', 'nav-item-active');

//menu animation
    menuBtn.addEventListener("click", toggleMenu.bind(null, menu, 'menu-active'));

//menu items animation
    menu.addEventListener("click", clickItem, false);
    menu.addEventListener("mouseenter", highlightItem, true);
    menu.addEventListener("mouseleave", blurItem, true);

//changing open/close menu icons
    function toggleMenu(menu, classname) {
        menuBtn.getElementsByTagName('i').item(0).classList.toggle('fa-bars');
        menuBtn.getElementsByTagName('i').item(0).classList.toggle('fa-times');
        menu.classList.toggle(classname);
    }
    function clickItem(e) {
        //apply animation only to menu items
        if(e.target.classList.contains('nav-item')){
            Array.prototype.forEach.call(menuItems, i => {
                    //if there is already selected item - remove classes from it
                    if(i.classList.contains('nav-item-clicked')){
                        i.classList.remove('nav-item-clicked', 'nav-item-active');
                    }
                }
            );
            e.target.classList.add('nav-item-clicked', 'nav-item-active');
            //if the same item selected - nothing changes
            if(document.getElementById('content-name').textContent!==e.target.textContent) {
                removeContent();
                showContent(e.target.textContent);
            }
        }
    }
    function highlightItem(e) {
        if(e.target.classList.contains('nav-item')) {
            if (!e.target.classList.contains('nav-item-clicked')) {
                e.target.classList.add('nav-item-active');
            }
        }
    }
    function blurItem(e) {
        if(e.target.classList.contains('nav-item')) {
            if (!e.target.classList.contains('nav-item-clicked')) {
                e.target.classList.remove('nav-item-active');
            }
        }
    }
//Dynamic content, obtained from json by menu item name
    function showContent(name) {
        let content = data.projects.filter(i => {
            return i.name === name;
        })[0];
        console.log(content);

        let fragment = document.createDocumentFragment();

        let nameDiv = document.createElement('div');//project name
        nameDiv.textContent = content.name;
        nameDiv.setAttribute('id', 'content-name');
        nameDiv.classList.add('content-name');

        fragment.appendChild(nameDiv);

        //list of tasks
        for(let i = 0; i < content.tasks.length; i++){
            let task = document.createElement('div');
            task.textContent = content.tasks[i];
            task.classList.add('task-item');
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            task.insertAdjacentElement('afterbegin', checkbox);
            fragment.appendChild(task);
        }

        contentContainer.appendChild(fragment);
    }
    function removeContent() {
        while (contentContainer.hasChildNodes()) {
            contentContainer.removeChild(contentContainer.firstChild);
        }
    }
}
