import { friendsData } from './Data.js';

const generateFriendsHtml = () => {
    const FRIENDS_LIST = friendsData;
    const items_in_row = 7;
    let x = 0;
    let y = -180;
    let html_string = '<div class="friends-list">';
    for (let i = 0; i < FRIENDS_LIST.length; i++) {
      if (i % items_in_row === 0) {
        y += 180;
        x = 0;
      }
      else x += 150;
      html_string += `<div class="friend" id="${FRIENDS_LIST[i].id}" style="transform: translate(${x}px, ${y}px);">
                         <div class="photo" style="background-image: url('${FRIENDS_LIST[i].photo}')"></div>
                         <div class="name">${FRIENDS_LIST[i].name}</div>
                         <div class="age">Age: ${FRIENDS_LIST[i].age}</div>
                         <div class="phone">Phone: ${FRIENDS_LIST[i].phone}</div>
                      </div>`;
    }
    return html_string + '</div>';
  }

const addFriendEvent = () => {
    const friends = document.getElementsByClassName('friends-list')[0];
    friends.onclick = (e) => {
      const friend = e.target.parentNode;
      toggleSelectedFriend(friend);
      blurNotSelectedFriends(friend.id, friend);
    }
}

const toggleSelectedFriend = (friend) => {
    const [name, age, phone] = document.querySelectorAll(`[id='${friend.id}'] > div:nth-last-of-type(-n+3)`);
    friend.classList.toggle('friend-selected');
    name.classList.toggle('name-selected');
    age.classList.toggle('age-phone-visible');
    phone.classList.toggle('age-phone-visible');
}

const blurNotSelectedFriends = (selected_id) => {
    const friends = document.querySelectorAll('.friend');
    const filters_container = document.getElementsByClassName('filters-container')[0];
    filters_container.classList.toggle('filters-container-disable');
    friends.forEach(friend => {
      if (friend.id != selected_id) {
        friend.classList.toggle('friend-not-selected');
      }
    });
}

const render = () => {
    const FRIENDS_LIST = generateFriendsHtml()
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', FRIENDS_LIST);
    addFriendEvent();
}

export default render;