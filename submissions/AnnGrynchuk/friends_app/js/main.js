document.addEventListener('DOMContentLoaded', function init(){

const url = 'https://randomuser.me/api/?results=15'; 
const container = document.querySelector('.friend_container');
const searchName = document.getElementById("searchName");
const sortByNameUp = document.getElementById("sortNameUp");
const sortByNameDown = document.getElementById("sortNameDown");
const sortByAgeUp = document.getElementById("sortAgeUp");
const sortByAgeDown = document.getElementById("sortAgeDown");
const reset =  document.getElementById("reset");
let sideMenu = document.querySelector('.side_menu_list');
let friends=[]; 
let filteredNames;

function handleErrors(response) {
  if (!response.ok) {
      throw Error(response.statusText);
  }
  return response;
} 

fetch(url)
.then(handleErrors)
.then((response) => response.json())
.then(function(data) {
  friends = data.results;
  showFriends(friends);
})
.catch(error => console.log(error));
  
function createFriendBox (friend){
    let friendBox = document.createElement('div');
    let friendInfo =document.createElement('div');
    let friendImg = document.createElement('img');
    let friendName = document.createElement('h3');
    let friendGender = document.createElement('p');
    let friendAge = document.createElement('p');
    let friendLocation = document.createElement('p');
    let friendPhone = document.createElement('p');

    friendBox.classList.add("info");
    friendImg.classList.add("photo");
    friendName.classList.add("name");
    friendGender.classList.add("text");
    friendAge.classList.add("text");
    friendLocation.classList.add("text");
    friendPhone.classList.add("text");

    friendImg.src = friend.picture.large;
    friendName.innerHTML = `${friend.name.first} ${friend.name.last}`;
    friendGender.innerHTML = `${friend.gender}`;
    friendAge.innerHTML ="I am " + `${friend.dob.age}` + " years old";
    friendLocation.innerHTML = "I live in " + `${friend.location.city}` + ", " + `${friend.location.state}`;
    friendPhone.innerHTML = "Call me: " + `${friend.phone}`;
     
    container.appendChild(friendBox);
    friendBox.append(friendImg, friendInfo);
    friendInfo.append(friendName, friendGender, friendAge, friendLocation, friendPhone);
};

function showFriends(data){
  container.innerHTML = "";
  data.forEach(createFriendBox);
};

searchName.addEventListener('change', () =>{
    let listOfFriends = [...friends];
    let writtenName = searchName.value.toLowerCase();
    filteredNames = listOfFriends.filter((item)=>
    item.name.first.toLowerCase().includes(writtenName));
    showFriends(filteredNames);
});

sideMenu.addEventListener('click', (e) =>{
    let friendList = [...friends];
    if(filteredNames)
     friendList = filteredNames;
     
 if( e.target === sortByNameUp){
    friendList.sort((a, b)=> 
     ((a.name.first > b.name.first) - (a.name.first < b.name.first)));
     showFriends(friendList);
 } else if( e.target === sortByNameDown){
    friendList.sort((a, b)=> 
     ((b.name.first > a.name.first) - (b.name.first < a.name.first)));
     showFriends(friendList);
 } else if(e.target === sortByAgeUp){
    friendList.sort((a, b)=> 
     a.dob.age - b.dob.age)
     showFriends(friendList);
 } else if( e.target === sortByAgeDown){
    friendList.sort((a, b)=> 
     b.dob.age - a.dob.age);
     showFriends(friendList);
 } else if(  e.target === reset){
     searchName.value = "";
     showFriends(friends);
 }
});
});

