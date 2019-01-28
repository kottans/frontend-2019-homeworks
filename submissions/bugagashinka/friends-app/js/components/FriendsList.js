const FriendsList = (function() {
  const friendsList = document.getElementById('friends-list');
  const MAX_TEXT_SIZE = 22;

  const showFriendList = friends => {
    clearFriendList();
    populateContent(friends);
  };

  const populateContent = friends => {
    const friendsFragment = document.createDocumentFragment();
    friends.forEach(person =>
      friendsFragment.appendChild(createPerson(person)),
    );
    friendsList.appendChild(friendsFragment);
  };

  const clearFriendList = () => {
    removeElementChilds(friendsList);
  };

  const createPerson = data => {
    const fullName = `${data.name.first} ${data.name.last}`;

    const person = createElement('li', ['person']);
    const info = createElement('div', ['info']);

    const avatar = createElement('img', [], '', [
      { name: 'src', value: data.picture.large },
      { name: 'alt', value: fullName },
    ]);
    const div = createElement('div');
    const loc = createElement('div', ['location']);
    const locIcon = createElement('span', ['fas', 'fa-map-marker-alt']);
    appendChildsTo(loc, [locIcon]);
    appendChildsTo(loc, [createElement('text', [], data.location.city)]);
    appendChildsTo(div, [avatar, loc]);

    const title = createElement('div', ['title']);
    const name = createElement('div', ['name'], `${fullName}`);
    let sexIconStyle = data.gender == 'female' ? 'fa-female' : 'fa-female';
    const sexIcon = createElement('span', ['sex', 'fas', sexIconStyle]);
    appendChildsTo(title, [sexIcon, name]);

    const details = createElement('div', ['details']);
    const email = createElement('div', ['email'], data.email);
    const phone = createElement('div', ['phone'], data.phone);
    const date = createElement(
      'div',
      ['date'],
      new Date(data.registered.date).toDateString(),
    );
    const age = createElement(
      'div',
      ['age'],
      `I have ${data.dob.age} years old.`,
    );
    appendChildsTo(details, [age, email, phone, date]);

    appendChildsTo(info, [title, details]);
    appendChildsTo(person, [div, info]);
    return person;
  };

  const removeElementChilds = element => {
    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
  };

  const appendChildsTo = (element, childrens) => {
    const docFragment = document.createDocumentFragment();
    childrens.forEach(child => docFragment.appendChild(child));
    element.appendChild(docFragment);
  };

  const createElement = (type, styles = [], text = '', attrs = []) => {
    if (type == 'text') {
      return document.createTextNode(text);
    }

    const element = document.createElement(type);
    if (text.length > MAX_TEXT_SIZE) {
      attrs.push({ name: 'title', value: text });
      text = `${text.slice(0, MAX_TEXT_SIZE)}...`;
    }

    element.innerText = text;
    attrs.forEach(attr => {
      element.setAttribute(attr.name, attr.value || null);
    });
    styles.forEach(style => {
      element.classList.add(style);
    });

    return element;
  };

  return {
    showFriendList: showFriendList,
  };
})();
