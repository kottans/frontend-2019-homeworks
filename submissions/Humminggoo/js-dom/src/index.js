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
        menuItems = document.querySelectorAll('.nav-item'),
        menuIcon = document.getElementById('menu-btn-icon'),
        contentContainer = document.getElementById('content');
//for the first load
    showContent(data.projects[0].name);
    menuItems[0].classList.add('nav-item-clicked', 'nav-item-active');

//menu animation
    menuBtn.addEventListener("click", () => toggleMenu(menu, menuIcon, 'menu-active'));

//menu items animation
    menu.addEventListener("click", clickItem);
    menu.addEventListener("mouseover", toggleItem);
    menu.addEventListener("mouseout", toggleItem);

//changing open/close menu icons
    function toggleMenu(menu, icon, classname) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
        menu.classList.toggle(classname);
    }
    function clickItem(e) {
        if(e.target.classList.contains('nav-item')){
            menuItems.forEach(i => {
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
    function toggleItem(e) {
        let target  = e.target.closest('.nav-item:not(.nav-item-clicked)');
        if(target) {
                target.classList.toggle('nav-item-active');
        }
    }
//Dynamic content, obtained from json by menu item name
    function showContent(name) {
        let content = data.projects.find(i => {
            return i.name === name;
        });
        console.log(content);

        let fragment = document.createDocumentFragment();

        let nameDiv = document.createElement('div');//project name
        nameDiv.textContent = content.name;
        nameDiv.setAttribute('id', 'content-name');
        nameDiv.classList.add('content-name');

        fragment.appendChild(nameDiv);

        //list of tasks
        content.tasks.forEach(i => {
            let task = document.createElement('div');
            task.textContent = i;
            task.classList.add('task-item');
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type', 'checkbox');
            task.insertAdjacentElement('afterbegin', checkbox);
            fragment.appendChild(task);
            }
        );
        contentContainer.appendChild(fragment);
    }
    function removeContent() {
        while (contentContainer.hasChildNodes()) {
            contentContainer.removeChild(contentContainer.firstChild);
        }
    }
}
