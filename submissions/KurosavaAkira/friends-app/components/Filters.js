import { friendsData } from './Data.js';

const options = {
    sort : ''
}

const filtersHtml = () => {
    return `<div class="filters-container">
                <input id="search" autocomplete="off" placeholder="Search...">
                <div class="sorting-buttons">
                    <button id="age" value="age">age</button>
                    <button id="reset" value="reset" class="sorting-buttons-active">reset</button>
                    <button id="name" value="name">a-z</button>
                </div>
            </div>`;
}

const addButtonsEvent = () => {
    const sortingButtons = document.querySelector('.sorting-buttons');
    sortingButtons.addEventListener('click', (e) => {
        switch (e.target.value) {
            case 'age':
                sortAge();
                break;
            case 'reset':
                sortReset();
                break;
            case 'name':
                sortName();
                break;
        }
    sortVisibleToTop();
    highlightActiveButton(e.target.value);
    updateDom();
    });
}

const sortAge = () => {
    if (options.sort === 'age') {
        options.sort = 'age-reverse';
        friendsData.sort((a, b) => {
            return b.age - a.age;
        }); 
    }
    else {
        options.sort = 'age';
        friendsData.sort((a, b) => {
            return a.age - b.age;
        });
    }
}

const sortReset = () => {
    friendsData.sort((a, b) => {
        options.sort = 'reset';
        return a.id - b.id;
    }); 
}

const sortName = () => {
    if (options.sort === 'name') {
        options.sort = 'name-reverse';
        friendsData.sort((a, b) => {
            return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
        }); 
    }
    else {
        options.sort = 'name';
        friendsData.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
    }
}

const highlightActiveButton = (value) => {
    const buttons = document.querySelectorAll('.sorting-buttons button');
    buttons.forEach( button => {
        if (button.value === value) highlightActiveButtonOption(button);
        else button.classList.remove('sorting-buttons-active', 'sorting-buttons-active-reverse');
    });
}

const highlightActiveButtonOption = (button) => {
    switch (options.sort) {
        case 'age':
        case 'name':
        case 'reset':
            button.classList.add('sorting-buttons-active');
            button.classList.remove('sorting-buttons-active-reverse')
            break;
        case 'age-reverse':
        case 'name-reverse':
            button.classList.add('sorting-buttons-active');
            button.classList.add('sorting-buttons-active-reverse')
            break;
    }
}

const addSearchEvent = () => {
    const search = document.getElementById('search');
    let events = ['keyup', 'input'];
    events.forEach(event => search.addEventListener(event, (e) => {
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
            sortVisibleToTop();
            updateDom();
        })
    );
}

const sortVisibleToTop = () => {
    friendsData.sort((a, b) => {
        return b.visible - a.visible;
    }); 
}

const inputEqualToFriendName = (e, friend) => {
    if (friend.name.includes(e.target.value.toLowerCase())) return true;
    return false;
}

const updateDom = () => {
    const items_in_row = 7;
    let x = 0;
    let y = -180;
    for (let i = 0; i < friendsData.length; i++) {
        if (i % items_in_row === 0) {
        y += 180;
        x = 0;
        }
        else x += 150;
        const friend_node = document.getElementById(friendsData[i].id);
        friend_node.style.transform = `translate(${x}px, ${y}px)`;
    }
}

const render = () => {
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', filtersHtml());
    addSearchEvent();
    addButtonsEvent();
}

export default render;