import { friendsData, recalculateCardPositions } from './Data.js';

const options = {
    sort : ''
}

const asc = (a, b) =>  a - b; 
const desc = (a, b) =>  b - a; 

const ascName = (a, b) =>  a.toLowerCase().localeCompare(b.toLowerCase());
const descName = (a, b) =>  b.toLowerCase().localeCompare(a.toLowerCase());

const filtersHtml = () => {
    return `<div class="dark-layer"></div>
            <div class="filters-container">
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
        friendsData.sort((a, b) => desc(a.age, b.age)); 
    } else {
        options.sort = 'age';
        friendsData.sort((a, b) => asc(a.age, b.age));
    }
}

const sortReset = () => {
    options.sort = 'reset';
    friendsData.sort((a, b) =>  asc(a.id, b.id)); 
}

const sortName = () => {
    if (options.sort === 'name') {
        options.sort = 'name-reverse';
        friendsData.sort((a, b) => descName(a.name, b.name));
    } else {
        options.sort = 'name';
        friendsData.sort((a, b) => ascName(a.name, b.name));
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
    const sortingOptions = ['age', 'name', 'reset'];
    button.classList.add('sorting-buttons-active');
    if (sortingOptions.includes(options.sort)) {
        button.classList.remove('sorting-buttons-active-reverse');
    } else {
        button.classList.add('sorting-buttons-active-reverse');
    }
}

const addSearchEvent = () => {
    const search = document.getElementById('search');
    let events = ['input'];
    events.forEach(event => search.addEventListener(event, (e) => {
            friendsData.forEach((friend, i) => {
                const friendNode = document.getElementById(friendsData[i].id); 
                if (inputEqualToFriendName(e, friend)) {
                    friendsData[i].isVisible = true;
                    friendNode.classList.remove('friend-hide');
                } else {
                    friendsData[i].isVisible = false;
                    friendNode.classList.add('friend-hide');
                }
            }); 
            sortVisibleToTop();
            updateDom();
        })
    );
}

const sortVisibleToTop = () => {
    friendsData.sort((a, b) => {
        return b.isVisible - a.isVisible;
    }); 
}

const inputEqualToFriendName = (e, friend) => {
    if (friend.name.includes(e.target.value.toLowerCase())) return true;
    return false;
}

const updateDom = () => {
    const positions = recalculateCardPositions(friendsData);
    positions.forEach(({ x, y }, i) => {
        const node = document.getElementById(friendsData[i].id);
        node.style.transform = `translate(${x}px, ${y}px)`;
    });
}

const render = () => {
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', filtersHtml());
    addSearchEvent();
    addButtonsEvent();
}

export default render;