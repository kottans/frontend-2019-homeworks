import { friendsData } from './Data.js';

const filtersHtml = () => {
    return `<div class="filters-container">
                <input id="search" autocomplete="off" placeholder="Search...">
                <div class="sorting-buttons">
                    <button id="age" value="age">age</button>
                    <button id="reset" value="reset" class="sorting-buttons-active">reset</button>
                    <button id="name" value="name">a-z/z-a</button>
                </div>
            </div>`;
}

const addButtonsEvent = () => {
    const sorting_buttons = document.getElementsByClassName('sorting-buttons')[0];
    sorting_buttons.onclick = (e) => {
        switch (e.target.value) {
            case 'age':
                sortAge();
                sortVisibleToTop();
                highlightActiveButton(e.target.value);
                updateDom();
                break;
            case 'reset':
                sortReset();
                sortVisibleToTop();
                highlightActiveButton(e.target.value);
                updateDom();
                break;
            case 'name':
                sortName();
                sortVisibleToTop();
                highlightActiveButton(e.target.value);
                updateDom();
                break;
        }
    }
}

const sortAge = () => {
    friendsData.sort((a, b) => {
        return a.age - b.age;
    }); 
}

const sortReset = () => {
    friendsData.sort((a, b) => {
        return a.id - b.id;
    }); 
}

const sortName = () => {
    friendsData.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    }); 
}

const highlightActiveButton = (value) => {
    const buttons = document.querySelectorAll('.sorting-buttons button');
    buttons.forEach( button => {
        if (button.value === value) button.classList.add('sorting-buttons-active');
        else button.classList.remove('sorting-buttons-active');
    });
}


const addSearchEvent = () => {
    const search = document.getElementById('search');
    search.onkeyup = (e) => {
        friendsData.forEach((friend, i) => {
            const friend_node = document.getElementById(friendsData[i].id); 
            if (inputEqualToFriendName(e, friend)) {
                friendsData[i].visible = true;
                friend_node.classList.remove('friend-hide');
            }
            else {
                friendsData[i].visible = false;
                friend_node.classList.add('friend-hide');
            }
        }); 
        sortVisibleToTop()
        updateDom();
    }
}

const sortVisibleToTop = () => {
    friendsData.sort((a, b) => {
        return b.visible - a.visible;
    }); 
}

const inputEqualToFriendName = (e, friend) => {
    if (friend.name.indexOf(e.target.value.toLowerCase()) >= 0) return true;
    return false;
}

const updateDom = () => {
    const items_in_row = 7;
    let margin_left = 0;
    let margin_top = -180;
    for (let i = 0; i < friendsData.length; i++) {
        if (i % items_in_row === 0) {
        margin_top += 180;
        margin_left = 0;
        }
        else margin_left += 150;
        const friend_node = document.getElementById(friendsData[i].id);
        friend_node.style.marginLeft = `${margin_left}px`;
        friend_node.style.marginTop = `${margin_top}px`;
    }
}

const render = () => {
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', filtersHtml());
    addSearchEvent();
    addButtonsEvent();
}

export default render;