export class Rooms {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.rooms = ["general"];
    this.activeRoom = "general";
  }

  render() {
    this.node.innerHTML = this.rooms.map(this.renderRoom).join("\n");
  }

  renderRoom = room =>
    this.activeRoom === room
      ? `<div class="room"><b>[room] ${room}</b></div>`
      : `<div class="room">[room] ${room}</div>`;

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
