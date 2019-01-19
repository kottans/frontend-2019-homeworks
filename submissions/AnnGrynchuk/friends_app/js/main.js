document.addEventListener('DOMContentLoaded', function init(){

const url = 'https://randomuser.me/api/?results=12'; 
const container = document.querySelector('.friendContainer');
 
function addElement(elem) {
    return document.createElement(elem);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let friends = data.results;
  return friends.map(function(friend) {
    let friendBox = addElement('div'),
        friendInfo =addElement('div');
        friendImg = addElement('img'),
        friendName = addElement('h3');
        friendGender = addElement('p');
        friendAge = addElement('p');
        friendNationality =addElement('p');
        friendMail = addElement('p');
        friendBox.classList.add("info");

    friendImg.src = friend.picture.medium;
    friendName.innerHTML = `${friend.name.first} ${friend.name.last}`;
    friendGender.innerHTML = `${friend.gender}`;
    friendAge.innerHTML = `${friend.dob.age}`;
    friendNationality.innerHTML = `${friend.nat}`;
    friendMail.innerHTML = `${friend.email}`;

    append(friendBox, friendImg);
    append(friendBox, friendInfo);
    append(friendInfo, friendName);
    append(friendInfo, friendGender);
    append(friendInfo, friendAge);
    append(friendInfo, friendNationality);
    append(friendInfo, friendMail);
    append(container, friendBox);
  })
})
.catch(function(error) {
  console.log(error);
});   
});