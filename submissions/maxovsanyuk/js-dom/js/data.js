let newItems = ['General Basics','Front-End Basics', 'Advanced Topics',];

for (const value of newItems){
    let topNav = document.createElement('div');
    topNav.innerHTML = "<span>" + value + "</span>";
    menu.appendChild(topNav);
    topNav.className = "newItem"

  
    topNav.addEventListener("mouseover",function(){
        topNav.classList.add('itemsMouseover');
    });
    topNav.addEventListener("mouseout",function(){
        topNav.classList.remove('itemsMouseover');
    });
};

let titleKottans = document.createElement("h1")
document.getElementById("content").insertAdjacentHTML('beforeend','<h1>Kottans Front-End Course 2019</h1>');

let content0 = document.getElementById("menu").children[0];
content0.addEventListener("click",function(){
       
    if(document.body.classList.contains("children0") === false){
        document.body.classList.add("children0");
        document.body.classList.remove("children1","children2");
        
        let myNode = document.getElementById("content");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        
        let contentItem0 = document.createElement("div");
        contentItem0.className = "mainContent";
        contentItem0.innerHTML = "<h1>General Basics</h1><ol><li><a>Git Basics</a></li><li><a>Linux CLI and Networking</a></li><li><a>VCS (hello gitty)GitHub and Collaboration</a></li></ol>"
        content.appendChild(contentItem0);
        let titleKottans = document.createElement("h1")
        document.getElementById("content").insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").style.cssText = "font-size: 36px;\
        color: rgb(197, 205, 211);\
        margin-block-start: 0.3em;\
        margin-block-end: 0.3em;\
        ";
    }
});
    




    
    

let content1 = document.getElementById("menu").children[1];
content1.addEventListener("click",function(){

    if(document.body.classList.contains("children1") === false){
        document.body.classList.add("children1");
        document.body.classList.remove("children0","children2");

      
        let myNode = document.getElementById("content");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
     
        let contentItem1 = document.createElement("div");
        contentItem1.className = "mainContent"
        contentItem1.innerHTML = "<h1>Front-End Basics</h1><ol><li><a>Intro to HTML & CSS</a></li><li><a>Responsive Web Design</a></li><li><a>JavaScript Basics</a></li><li><a>Document Object Model - practice></a></li></ol>"
        content.appendChild(contentItem1);
    
        let titleKottans = document.createElement("h1")
        document.getElementById("content").insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").style.cssText = "font-size: 36px;\
        color: rgb(15, 18, 20);\
        margin-block-start: 0.3em;\
        margin-block-end: 0.3em;\
        ";
    }
});



let content2 = document.getElementById("menu").children[2];
content2.addEventListener("click",function(){
       
    if(document.body.classList.contains("children2") === false){
        document.body.classList.add("children2");
        document.body.classList.remove("children0","children1");

    
        let myNode = document.getElementById("content");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        } 
     
        let contentItem2 = document.createElement("div");
        contentItem2.className = "mainContent"
        contentItem2.innerHTML = "<h1>Advanced Topics</h1><ol><li><a>Building a Tiny JS World (pre-OOP) - practice</a></li><li><a>Object oriented JS - practice</a></li><li><a>OOP exercise - practice</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Memory pair game — real project!</a></li><li><a>Website Performance Optimization</a></li><li><a>Friends App - real project!</a></li></ol>"
        content.appendChild(contentItem2);

        let titleKottans = document.createElement("h1")
        document.getElementById("content").insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").style.cssText = "font-size: 36px;\
        color: rgb(197, 205, 211); \
        margin-block-start: 0.3em;\
        margin-block-end: 0.3em;\
        ";  
    }
});
    
