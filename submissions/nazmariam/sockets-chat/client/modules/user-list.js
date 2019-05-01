export class UserList {
    constructor(selector){
        this.node = document.querySelector(selector);
    }
    render = array => {
        this.node.innerHTML = '';
        array.forEach(
            value=>this.node.innerHTML += `<li>${value}</li>`
        )
    }
}
