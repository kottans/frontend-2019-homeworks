import {Label} from './label.js';

export class TypingStatus extends Label {
  constructor(...args) {
    super(...args);

    this.timeout = 3000;
    this.typingUsers = {};
  }

  addTypingUser(username) {
    this.typingUsers[username] = this.scheduleClear(username);
    this.render();
  }

  removeTypingUser = (username) => {
    delete this.typingUsers[username];
    this.render();
  };

  render() {
    super.render(this.getMessage());
  }

  getMessage() {
    const typingUserNames = Object.keys(this.typingUsers);
    const count = typingUserNames.length;

    switch (count) {
      case 2:
        return `${typingUserNames.join(' and ')} are typing.`;
      case 1:
        return `${typingUserNames[0]} is typing`;
      default:
        return count > 2 ?
          'Multiple users are typing.' :
          '';
    }
  }

  scheduleClear(username) {
    clearTimeout(this.typingUsers[username]);
    return setTimeout(() => this.removeTypingUser(username), this.timeout);
  }
}
