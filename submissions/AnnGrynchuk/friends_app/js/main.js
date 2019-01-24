document.addEventListener('DOMContentLoaded', function init(){

const url = 'https://randomuser.me/api/?results=15'; 
const container = document.querySelector('.friendContainer');
const searchName = document.getElementById("searchName");
const sortByNameUp = document.getElementById("sortNameUp");
const sortByNameDown = document.getElementById("sortNameDown");
const sortByAgeUp = document.getElementById("sortAgeUp");
const sortByAgeDown = document.getElementById("sortAgeDown");
const reset =  document.getElementById("reset");
let friends=[]; 
let sideMenu = document.querySelector('.side_menu_list');

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  friends = data.results;
  showFriends(friends);
})
.catch(function(error) {
  console.log(error);
});   

function addElement(elem) {
  return document.createElement(elem);
};

function append(parent, el) {
return parent.appendChild(el);
};
 
function showFriends(data){
  return data.map(function(friend) {
    let friendBox = addElement('div');
    let friendInfo =addElement('div');
    let friendImg = addElement('img');
    let friendName = addElement('h3');
    let friendGender = addElement('p');
    let friendAge = addElement('p');
    let friendLocation =addElement('p');
    let friendPhone = addElement('p');
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

    append(friendBox, friendImg);
    append(friendBox, friendInfo);
    append(friendInfo, friendName);
    append(friendInfo, friendGender);
    append(friendInfo, friendAge);
    append(friendInfo, friendLocation);
    append(friendInfo, friendPhone);
    append(container, friendBox);
  })
};

sideMenu.addEventListener('click', (e) =>{
 let friendList = [...friends];

 if(e.target === searchName ){
  friendList = friendList.filter((item)=>{
    let writtenName = searchName.value.toLowerCase();
    let name = item.name.first.toLowerCase();
   return name.includes(writtenName);
  });
 } else if( e.target === sortByNameUp){
    friendList.sort((a, b)=> 
    ((a.name.first > b.name.first) - (a.name.first < b.name.first)));

 } else if( e.target === sortByNameDown){
    friendList.sort((a, b)=> 
    ((b.name.first > a.name.first) - (b.name.first < a.name.first)));
  
 } else if(e.target === sortByAgeUp){
    friendList.sort((a, b)=> 
     a.dob.age - b.dob.age)

 } else if( e.target === sortByAgeDown){
    friendList.sort((a, b)=> 
      b.dob.age - a.dob.age);

 } else if(  e.target === reset){
   showFriends(friends);
 }
 container.innerHTML = "";
 showFriends(friendList);
});
});