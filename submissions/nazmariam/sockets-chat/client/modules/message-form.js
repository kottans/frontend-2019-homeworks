import {Messages} from "./messages.js";

const messages = new Messages('#chat');
const currentTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return hours+':'+minutes+':'+seconds;
};

let data1 = currentTime();
export class MessageForm {
    constructor(selector) {
        this.node = document.querySelector(selector);
        this.input = this.node[0];
        this.status="pending";
    }
    onSubmit(handler) {
        this.node.addEventListener('submit', event => {
            event.preventDefault();

            if(this.input.value) {
                messages.renderMessage(data1, 'me', this.input.value, this.status);
                handler(this.input.value);
                this.input.value='';
            }
        })
    }
    onKeyDown = handler => this.input.addEventListener('keydown', () => handler());
    onKeyUp = handler => this.input.addEventListener('keyup', () => handler());
}
