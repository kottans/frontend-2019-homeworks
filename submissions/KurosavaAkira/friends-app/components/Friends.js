import { friendsData, recalculateCardPositions } from './Data.js';
  
const createFriendCard = (friend, { x, y }) => {
  const { id, photo, name, age, phone } = friend;

  return `<div class="friend" id="${id}" style="transform: translate(${x}px, ${y}px);">
            <div class="photo" style="background-image: url('${photo}')"></div>
            <div class="name">${name}</div>
            <div class="age">Age: ${age}</div>
            <div class="phone">Phone: ${phone}</div>
        </div>`;
};

const generateFriendsHtml = () => {
  const positions = recalculateCardPositions(friendsData);  
  return '<div class="friends-list">' + positions
    .map((pos, i) => createFriendCard(friendsData[i], pos))
    .join('') + '</div>';
}

const addFriendEvent = () => {
    const friends = document.querySelector('.friends-list');
    friends.addEventListener('click', (e) => {
      const friend = e.target.closest('.friend');
      if (friend === null) return;
      else {
        toggleSelectedFriend(friend);
        blurNotSelectedFriends(friend.id, friend);
      }
    });
}

const toggleSelectedFriend = (friend) => {
    const [name, age, phone] = document.querySelectorAll(`[id='${friend.id}'] > div:nth-last-of-type(-n+3)`);
    friend.classList.toggle('friend-selected');
    name.classList.toggle('name-selected');
    age.classList.toggle('age-phone-visible');
    phone.classList.toggle('age-phone-visible');
}

const blurNotSelectedFriends = (selectedId) => {
    const dark_layer = document.querySelector('.dark-layer');
    const filtersContainer = document.querySelector('.filters-container');
    const friends_list = document.querySelector('.friends-list');
    const friends = document.querySelectorAll('.friend');
    dark_layer.classList.toggle('dark-layer-visible');
    filtersContainer.classList.toggle('filters-container-disable');
    friends_list.classList.toggle('friends-list-transform');
    friends.forEach(friend => {
      if (friend.id != selectedId) {
        friend.classList.toggle('friend-not-selected');
      }
    });
}

const render = () => {
    const friendsList = generateFriendsHtml()
    const container = document.getElementById('container');
    container.insertAdjacentHTML('beforeend', friendsList);
    addFriendEvent();
}

export default render;