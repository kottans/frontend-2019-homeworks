class FriendsController {
  constructor() {
    this.friendsDataArr = [];
  }
  getData(friendsNum){
    if (!friendsNum || friendsNum < 0) {
      friendsNum = 20;
    }

    let xhr = new XMLHttpRequest();
    xhr.open(`GET`, `https://randomuser.me/api/?results=${friendsNum}&inc=phone,name,picture,dob&nat=us,dk,fr,gb&noinfo`, false);
    xhr.send();
    if (xhr.status != 200) {
      console.error(xhr.status + ': ' + xhr.statusText);
    } else {
      console.log(xhr.responseText);
      this.friendsDataArr = JSON.parse(xhr.responseText).results;
      console.log(this.friendsDataArr);
    }
  }
  getSortFriends(param, az, friendsArr = this.friendsDataArr){
    if (param == `name`) {
      return friendsArr.sort((a, b)=>{
        if (az) {
          return `${a.name.first} ${a.name.last}` > `${b.name.first} ${b.name.last}` ? 1 : -1;
        }else{
          return `${a.name.first} ${a.name.last}` < `${b.name.first} ${b.name.last}` ? 1 : -1;
        }
      });
    }
    if (param == `age`) {
    return friendsArr.sort((a, b)=>{
        if (az) {
          return +a.dob.age > +b.dob.age ? 1 : -1;
        }else{
          return +a.dob.age < +b.dob.age ? 1 : -1;
        }
      });
    }
    return null;
  }
  getFiltredFriends(param, value, friendsArr = this.friendsDataArr){
    return friendsArr.filter((friend) => {
      if (param == `name`) {
        return !(`${friend.name.first} ${friend.name.last}`.indexOf(value) == -1)
      }
      if (param == `age`) {
        return friend.dob.age == value;
      }
    });
  }
}

class  FriendsBlockElement {
  constructor(blockElement) {
    this.blockElement = blockElement;
  }
  fillBlock(friendArray){
    let frag = document.createDocumentFragment();
    friendArray.forEach(friend => {
      let friendCard = new FriendCard(friend);
      frag.appendChild(friendCard.getFriendCardElement());
    });
    this.blockElement.innerHTML = ``;
    this.blockElement.appendChild(frag);
  }
}

class FriendCard {
  constructor(obj) {
    this.friendObj = obj;
  }
  getFriendCardElement(){
    let cardElement = document.createElement(`div`);
    cardElement.classList.add(`card`);
    let nameElement = document.createElement(`div`);
    nameElement.classList.add(`nametext`);
    nameElement.textContent = `${this.friendObj.name.first} ${this.friendObj.name.last}`;
    cardElement.appendChild(nameElement);
    let photoElement = document.createElement(`div`);
    let img = document.createElement(`img`);
    img.setAttribute(`src`, this.friendObj.picture.large);
    photoElement.appendChild(img);
    cardElement.appendChild(photoElement);
    let ageEelement = document.createElement(`div`);
    ageEelement.textContent = `${this.friendObj.dob.age} years old`;
    cardElement.appendChild(ageEelement);
    let phoneElement = document.createElement(`div`);
    phoneElement.textContent = this.friendObj.phone;
    phoneElement.classList.add(`phonetext`);
    cardElement.appendChild(phoneElement);
    return cardElement;
  }
}

let controller = new FriendsController();
let friendsBlock = new FriendsBlockElement(document.getElementsByClassName(`users`)[0]);
controller.getData();
friendsBlock.fillBlock(controller.friendsDataArr);

let ageSortAzBtn = document.getElementById(`agesortAZ`);
let ageSortZaBtn = document.getElementById(`agesortZA`);
let nameSortAzBtn = document.getElementById(`namesortAZ`);
let nameSortZaBtn = document.getElementById(`namesortZA`);
let ageFilterInpt = document.getElementById(`ageinput`);
let nameFilterInpt = document.getElementById(`nameinput`);
let ageFilterBtn = document.getElementById(`agefilter`);
let nameFilterBtn = document.getElementById(`namefilter`);
let resetBtn = document.getElementById(`resetbtn`);

ageSortAzBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getSortFriends(`age`, true));
});

ageSortZaBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getSortFriends(`age`, false));
});

nameSortAzBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getSortFriends(`name`, true));
});

nameSortZaBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getSortFriends(`name`, false));
});

ageFilterBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getFiltredFriends(`age`, ageFilterInpt.value));
});

nameFilterBtn.addEventListener('click', function(evt){
  friendsBlock.fillBlock(controller.getFiltredFriends(`name`, nameFilterInpt.value));
});

resetBtn.addEventListener(`click`, function(evt){
  friendsBlock.fillBlock(controller.friendsDataArr);
})
