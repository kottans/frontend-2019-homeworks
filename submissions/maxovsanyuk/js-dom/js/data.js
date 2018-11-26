let newItems = ['General Basics','Front-End Basics', 'Advanced Topics',];
let myNode = document.getElementById("content");

let clickDel = function (){
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
   } 

newItems.forEach(function(item){
    let topNav = document.createElement('div');
    topNav.innerHTML = "<span>" + item + "</span>";
    menu.appendChild(topNav);
    topNav.className = "new-item"

    topNav.addEventListener("mouseover",function(){
        topNav.classList.add('items-mouseover');
    });
    topNav.addEventListener("mouseout",function(){
        topNav.classList.remove('items-mouseover');
    });
});

let titleKottans = document.createElement("h1")
document.getElementById("content").insertAdjacentHTML('beforeend','<h1>Kottans Front-End Course 2019</h1>');

let generalBasics = document.querySelectorAll("nav >div.new-item")[0];
generalBasics.addEventListener("click",function(){
       
    if(document.body.classList.contains("children0") === false){
        document.body.classList.add("children0");
        document.body.classList.remove("children1","children2");
        
        clickDel();
        
        let generalContent = document.createElement("div");
        generalContent.className = "main-content";
        generalContent.innerHTML = "<h1>General Basics</h1><ol><li><a>Git Basics</a></li><li><a>Linux CLI and Networking</a></li><li><a>VCS (hello gitty)GitHub and Collaboration</a></li></ol>"
        content.appendChild(generalContent);
        let titleKottans = document.createElement("h1")
        myNode.insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").className = "tittle"
    }
});
    
let frontendBasics = document.querySelectorAll("nav >div.new-item")[1];

frontendBasics.addEventListener("click",function(){

    if(document.body.classList.contains("children1") === false){
        document.body.classList.add("children1");
        document.body.classList.remove("children0","children2");

        clickDel();
        
        let frontendContent = document.createElement("div");
        frontendContent.className = "main-content"
        frontendContent.innerHTML = "<h1>Front-End Basics</h1><ol><li><a>Intro to HTML & CSS</a></li><li><a>Responsive Web Design</a></li><li><a>JavaScript Basics</a></li><li><a>Document Object Model - practice></a></li></ol>"
        content.appendChild(frontendContent);
    
        let titleKottans = document.createElement("h1")
        myNode.insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").className = "tittle"
    }
});

let advancedTopics = document.querySelectorAll("nav >div.new-item")[2];
advancedTopics.addEventListener("click",function(){
       
    if(document.body.classList.contains("children2") === false){
        document.body.classList.add("children2");
        document.body.classList.remove("children0","children1");

        clickDel();
        
        let advancedContent = document.createElement("div");
        advancedContent.className = "main-content"
        advancedContent.innerHTML = "<h1>Advanced Topics</h1><ol><li><a>Building a Tiny JS World (pre-OOP) - practice</a></li><li><a>Object oriented JS - practice</a></li><li><a>OOP exercise - practice</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Offline Web Applications</a></li><li><a>Memory pair game — real project!</a></li><li><a>Website Performance Optimization</a></li><li><a>Friends App - real project!</a></li></ol>"
        content.appendChild(advancedContent);

        let titleKottans = document.createElement("h1")
        myNode.insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
        document.querySelector("h1").className = "tittle"
    }   
});
    

