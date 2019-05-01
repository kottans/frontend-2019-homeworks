export class TypingMessage {
    constructor(selector) {
        this.node = document.querySelector(selector);
        this.users = [];
    }

    render = ( name ) => {
        if(!this.users.includes(name))
            this.users.push(name);
        this.node.innerHTML = `<p>${this.users.join(', ')} typing...</p>`;
    };

    clear = ( name ) => {
        setTimeout( () => {
            this.node.innerHTML = '';
            const index = this.users.indexOf(name);
            this.users.splice(index, 1);
        }, 2000)
    }
}

