export class UsersList {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render(usernames) {
    this.node.innerHTML = '';
    const createUsers = user => {
      let fragment = document.createDocumentFragment();
      let ul = document.createElement('ul');
      ul.classList.add('user');
      let userContent = `<li>${user.username}</li>`;
      ul.innerHTML = userContent;
      fragment.append(ul);
      return fragment;
    };
    let users = usernames.map(createUsers);
    this.node.append(...users);
  }
}
