window.addEventListener('DOMContentLoaded', () => { 
    searchButtonClick();
    luckyButtonClick();
});

import IMG_BUSY from '../img/busy.gif';
import IMG_BROKEN from '../img/broken.gif';
import IMG_NOTCAT from '../img/not_a_cat.gif';
import IMG_LAZY from '../img/lazy.gif';
import IMG_HUMANCAT from '../img/humancat.gif';
import IMG_SMART from '../img/smart.gif';
import IMG_HAPPY from '../img/happy.gif';
import IMG_GRINS from '../img/grins.jpg';
import IMG_LOADING from '../img/loading.gif';

const SEARCH_DATA = [
    {
        name: 'Busy',
        text: 'Sorry, but the Kottan is busy right now. Please, try again.',
        img: IMG_BUSY
    },
    {
        name: 'Broken',
        text: 'Oops, you have got a broken Kottan. Please, try again.',
        img: IMG_BROKEN
    },
    {
        name: 'Not a Kottan',
        text: 'Looks like it\'s not a Kottan. Please, try again.',
        img: IMG_NOTCAT
    },
    {
        name: 'Humancat',
        text: 'Experimental beta version Kottan.',
        img: IMG_HUMANCAT
    },
    {
        name: 'Lazy',
        text: 'The lazy one. Don\'t stop trying.',
        img: IMG_LAZY
    },
    {
        name: 'Liar',
        text: 'Congratulations! You found a mocking Kottan.',
        imgLoading: IMG_LOADING,
        img: IMG_GRINS
    },
    {
        name: 'Wise Kottan',
        text: `<p class="text-left">Your time is limited, so don't waste it living someone else's life.<br>
                Don't be trapped by dogma -<br>which is living with the results of other people's thinking.<br>
                Don't let the noise of others opinions drown out your own inner voice.<br> 
                And most important, have the courage to follow your heart and intuition.<br> 
                They somehow already know what you truly want to become. <br>
                Everything else is secondary.<br>Stay hungry, stay foolish.</p>`,
        img: IMG_SMART
    },
    {
        name: 'Happy Kottan',
        text: 'This was the last Kottan. Come back later!',
        img: IMG_HAPPY
    },
]

let searchCount = -1;

const searchButtonClick = () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', search);
}

const search = () => {
    const searchResult = document.querySelector('.search-result');
    searchResult.innerHTML = renderResult(getSearchData());
}

const renderResult = (searchData) => {
    const searchInput = document.getElementById('search');
    if (loadFakeSearch(searchData.name)) return renderFakeSearch(searchData);
    searchInput.value = searchData.name;
    return `<div class="result-text">${searchData.text}</div>
            <div class="result-img">
                <img src="${searchData.img}" height="400px">
            </div>`
}

const getSearchData = () => {
    if (searchCount === SEARCH_DATA.length - 1) searchCount = -1;
    searchCount++
    let i = searchCount;
    return SEARCH_DATA[i];
}

const loadFakeSearch = (searchName) => {
    if (searchName === 'Liar') return true;
    return false;
}

const renderFakeSearch = (searchData) => {
    const searchForm = document.querySelector('.search-form');
    const buttons = document.querySelectorAll('.search-button');
    searchForm.classList.toggle('search-form-fake');
    buttons.forEach(button => button.classList.toggle('searching-input-fake'));
    setTimeout(() => {
        const img = document.querySelector('.result-img');
        const resultText = document.querySelector('.result-text');
        const searchInput = document.getElementById('search');
        searchForm.classList.toggle('search-form-fake');
        resultText.classList.remove('result-text-hide');
        buttons.forEach(button => button.classList.toggle('searching-input-fake'));
        searchInput.value = searchData.name;
        img.innerHTML = `<img src="${searchData.img}" height="400px">`;
    }, 1800);
    return `<div class="result-text result-text-hide">${searchData.text}</div>
            <div class="result-img">
                <img src="${searchData.imgLoading}" height="100px">
            </div>`
}

const luckyButtonClick = () => {
    const luckyButton = document.querySelector('#lucky-button');
    luckyButton.addEventListener('click', luckyButtonApply);
}

const luckyButtonApply = () => {
    const flipCardInner = document.querySelector('.flip-card-inner');
    flipCardInner.classList.toggle('flip-card-inner-show');
    setTimeout(() => {
        flipCardInner.classList.toggle('flip-card-inner-show');        
    }, 2000);
}
