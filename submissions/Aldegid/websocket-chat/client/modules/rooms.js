export class Rooms {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.rooms = ['general'];
    this.activeRoom = 'general';
  }

  render() {
    this.node.innerHTML = this.rooms.map(this.renderRoom).join('\n');
  }

  renderRoom = room =>
    this.activeRoom === room
      ? `<b><span class="accent-span orange" >room:</span> ${room}</b>`
      : `<span class="accent-span">room:</span> ${room}`;

  add(room) {
    if (this.rooms.includes(room)) {
      return;
    }

    this.rooms.push(room);
  }

  select(room) {
    this.activeRoom = room;
  }
}
