export class Messages{
    constructor(selector){
        this.node = document.querySelector(selector);
    }
    renderMessage = (data, username, message, status) =>{
        const messageHeight = document.getElementById('messages');
        if(username==='me'){
            this.node.innerHTML += `<p><strong>[me]: ${message}</strong><span class="time"> ${data}</span>&nbsp;<span class="time status">${status}</span></p>`;
        }else{
            this.node.innerHTML += `<p>[${username}]: ${message} <span class="time"> ${data}</span></p>`;
        }
        messageHeight.scrollTo(0,messageHeight.scrollHeight);
    };
    renderSystemMessage = (data, message, status) => {
        this.renderMessage(data,'system', message);
    };
}
