const CONTAINER = document.getElementById('container');
const SIDEBAR = document.getElementById('sidebar');
const SEARCH_FIELD = document.getElementById('searchField');
const URL = 'https://randomuser.me/api/?results=40';

let persons = [];
let displayList = [];
let searchStr = '';

async function loadXMLDoc() {
  let response = await fetch(URL)
                  .then(data => data.json())
                  .then(function(data){
                    persons = data.results;
                    displayList = persons;
                    displayCards();
                  })
                  .catch(function(error){
                    console.log('error');
                  })
}

function getTemplate(el) {
  return `<div class="card">
            <div class="picture">
              <img src="${el.picture.large}">
            </div>
            <h1>${el.name.last} ${el.name.first}</h1>
            <div class="cardInfo">
              <p><span class="text_title">Age:</span> ${el.dob.age}</p>
              <p><span class="text_title">Gender:</span> ${el.gender}</p>
              <p><span class="text_title">Phone:</span> ${el.phone}</p>
            </div>
          </div>`
}

function displayCards() {
  CONTAINER.innerHTML = '';
  let cardMarkup = '';
  cardMarkup += displayList.reduce((accumulator, currentValue) => accumulator.concat(getTemplate(currentValue)), '');
  CONTAINER.insertAdjacentHTML('afterbegin',cardMarkup);
}

document.addEventListener('DOMContentLoaded', function(){  
  loadXMLDoc();

  SIDEBAR.addEventListener('click', function(event){
    let radio = event.target.closest('.rdBtn');
    let btn = event.target.closest('button');
    if(radio){
      switch(radio.id){
        case 'genderAll':
          displayList = persons;
          break;
        case 'genderMale':
          displayList = persons.filter( el => el.gender == 'male' );
          break;
        case 'genderFemale':
          displayList = persons.filter( el => el.gender == 'female' );
          break;
        case 'nameAsc':
          displayList = displayList.sort((b, a) => a.name.last > b.name.last ? -1 : 1);
          break;
        case 'nameDesc':
          displayList = displayList.sort((b, a) => a.name.last < b.name.last ? -1 : 1);
          break;
        case 'ageLow':
          displayList = displayList.sort((a, b) => a.dob.age - b.dob.age);
          break;
        case 'ageHigh':
          displayList = displayList.sort((b, a) => a.dob.age - b.dob.age);
          break;
      }
    }
    else if(btn){
      displayList = persons;
    }
    displayCards();
  })

  SEARCH_FIELD.addEventListener('keyup', function(event){
    searchStr = SEARCH_FIELD.value;
    displayList = persons.filter(el => el.name.last.indexOf(searchStr) != -1 || el.name.first.indexOf(searchStr) != -1)
    displayCards();
  })
});


