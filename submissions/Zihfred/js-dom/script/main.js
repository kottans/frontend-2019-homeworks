class Menu{
    constructor(){
        this.menuItems = document.querySelectorAll('.menuItem');
        this.contentIcon = document.querySelector('.contentIconItem');
        this.contentText = document.querySelector('.content__text');
        this.init();
     this.data = {
         HTML: "Hyper Text Markup Language (HTML) is the backbone of any website development process, without which a web page doesn't exist. Hypertext means that text has links, termed hyperlinks, embedded in it. When a user clicks on a word or a phrase that has a hyperlink, it will bring another web-page. A markup language indicates text can be turned into images, tables, links, and other representations. It is the HTML code that provides an overall framework of how the site will look. HTML was developed by Tim Berners-Lee. The latest version of HTML is called HTML5 and was published on October 28, 2014 by the W3 recommendation. This version contains new and efficient ways of handling elements such as video and audio files.",
         CSS: "Cascading Style Sheets (CSS) controls the presentation aspect of the site and allows your site to have its own unique look. It does this by maintaining style sheets which sit on top of other style rules and are triggered based on other inputs, such as device screen size and resolution.",
         JS:"JavaScript is an event-based imperative programming language (as opposed to HTML's declarative language model) that is used to transform a static HTML page into a dynamic interface. JavaScript code can use the Document Object Model (DOM), provided by the HTML standard, to manipulate a web page in response to events, like user input.\n" +
             "\n" +
             "Using a technique called AJAX, JavaScript code can also actively retrieve content from the web (independent of the original HTML page retrieval), and also react to server-side events as well, adding a truly dynamic nature to the web page experience."
     };
     this.events();
    }
    init(){
        this.selectedItem = "JS";
        this.menuItems.forEach((item)=> {
            if(item.textContent === this.selectedItem){
                item.classList.add('selected');
            }
        })
    }
    menuClick(e){
        this.menuItems.forEach((item)=> {
            item.classList.remove('selected');
        });
        this.selectedItem = e.target.textContent;
        e.target.classList.add('selected');
        this.updateContent();
    }
    updateContent(){
        this.contentText.textContent = this.data[this.selectedItem];
        this.contentIcon.classList = this.getIcon();
    }
    getIcon(){
        if(this.selectedItem === "JS"){
            return "contentIconItem fab fa-js";
        }else if(this.selectedItem === "HTML"){
            return "contentIconItem fab fa-html5";
        }else if(this.selectedItem === "CSS"){
            return "contentIconItem fab fa-css3-alt";
        }
    }
    events(){
         this.menuItems.forEach((elem) => { elem.addEventListener('click',(e) => this.menuClick(e))} );
}


}

let menu = new Menu();