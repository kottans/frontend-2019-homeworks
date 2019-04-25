export class UsersList {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render = (list) => {
    const fragment = document.createDocumentFragment();
    list.forEach(user => {
      const li = document.createElement('li');
      li.innerHTML = user.username;

      if(user.img) {
        const img = document.createElement('img');
        img.src = user.img
        img.classList = 'avatar'
        li.append(img)
      }

      fragment.append(li);
    });
    
    this.node.innerHTML = '';
    this.node.append(fragment)
  }
}
