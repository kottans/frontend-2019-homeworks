export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  append(username, message, timestamp, me = false, isPending = false) {
    if (me) {
      const typeStatus = isPending ? "pending" : "sent";
      if (isPending) {
        this.node.innerHTML += `<span class = "user user-me">me</span> <strong class = "message message-pending">${message}</strong> <span class="status status-${typeStatus}">${typeStatus}</span> <span class="time time-${typeStatus}"></span>\n`;
      } else {
        const nodesMessages = document.querySelectorAll(".message-pending");
        const nodesStatus = document.querySelectorAll(".status-pending");
        const nodesTime = document.querySelectorAll(".time-pending");
        let isFind = false;
        nodesMessages.forEach((node, index) => {
          if (node.innerHTML == message && !isFind) {
            node.classList.remove("message-pending");
            nodesStatus[index].innerHTML = "sent";
            nodesStatus[index].classList.remove("status-pending");
            nodesStatus[index].classList.add("status-sent");
            nodesTime[index].innerHTML = `${timestamp}`;
            nodesTime[index].classList.remove("time-pending");
            nodesTime[index].classList.add("time-sent");
            isFind = true;
          }
        });

        if (!isFind)
          this.node.innerHTML = `<span class = "user user-me">me</span> <strong>${message}</strong> <span class="status status-${typeStatus}">${typeStatus}</span> <span class="time time-${typeStatus}">${timestamp}</span>\n`;
      }
    } else {
      const typeUser = username === "system" ? username : "other";
      this.node.innerHTML += `<span class="user user-${typeUser}">${username}</span> ${message} <span class="time time-${typeUser}">${timestamp}</span>\n`;
    }
  }

  appendSystem(message, timestamp) {
    this.append("system", message, timestamp);
  }

  clear() {
    this.node.innerHTML = "";
  }
}
