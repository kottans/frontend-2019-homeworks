export class Users {
  constructor(selector) {
    this.node = document.querySelector(selector);
   
  }


  render(users) {
    this.node.innerHTML = users.map(user => `[user] ${user} \n`).join('');
  }

}
