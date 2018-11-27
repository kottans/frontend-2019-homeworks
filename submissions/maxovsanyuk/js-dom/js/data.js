let newItems = ['General Basics','Front-End Basics', 'Advanced Topics',];
let myNode = document.getElementById("content");

const cleanChildren = () => {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
   } 

const contentTitle = () =>{
    document.createElement("h1")
    myNode.insertAdjacentHTML('afterbegin','<h1>Kottans Front-End Course 2019</h1>');
    document.querySelector("h1").className = "tittle"
}

newItems.forEach(function(item){
    let topNav = document.createElement('div');
    topNav.innerHTML = "<span>" + item + "</span>";
    menu.appendChild(topNav);   
});

menu.children[0].className = "generalBasics";
menu.children[1].className = "frontendBasics";       
menu.children[2].className = "advancedTopics"; 


let titleKottans = document.createElement("h1")
myNode.insertAdjacentHTML('beforeend','<h1>Kottans Front-End Course 2019</h1>');

let generalBasics = document.querySelector(".generalBasics");
generalBasics.addEventListener("click",function(){
       
    if(document.body.classList.contains("children-first") === false){
        document.body.classList.add("children-first");
        document.body.classList.remove("children-second","children-third");
        
        cleanChildren();
        
        let generalContent = document.createElement("div");
        generalContent.className = "main-content";
        generalContent.innerHTML = `
        <h1>General Basics</h1>
        <ol>
           <li>Git Basics</li>
           <li>Linux CLI and Networking</li>
           <li>VCS (hello gitty)GitHub and Collaboration</li>
        </ol>`
        content.appendChild(generalContent);
        
        contentTitle();
    }
});
    
let frontendBasics = document.querySelector(".frontendBasics");

frontendBasics.addEventListener("click",function(){

    if(document.body.classList.contains("children-second") === false){
        document.body.classList.add("children-second");
        document.body.classList.remove("children-first","children-third");

        cleanChildren();
        
        let frontendContent = document.createElement("div");
        frontendContent.className = "main-content"
        frontendContent.innerHTML = `
        <h1>Front-End Basics</h1>
        <ol>
            <li>Intro to HTML & CSS</li>
            <li>Responsive Web Design</li>
            <li>JavaScript Basics></li>
            <li>Document Object Model - practice</li>
        </ol>`
        content.appendChild(frontendContent);
        
        contentTitle();
    }
});

let advancedTopics = document.querySelector(".advancedTopics");
advancedTopics.addEventListener("click",function(){
       
    if(document.body.classList.contains("children-third") === false){
        document.body.classList.add("children-third");
        document.body.classList.remove("children-first","children-second");

        cleanChildren();
        
        let advancedContent = document.createElement("div");
        advancedContent.className = "main-content"
        advancedContent.innerHTML = `
        <h1>Advanced Topics</h1>
        <ol>
            <li>Building a Tiny JS World (pre-OOP) - practice</li>
            <li>Object oriented JS - practice</li>
            <li>OOP exercise - practice</li>
            <li>Offline Web Applications</li>
            <li>Offline Web Applications</li>
            <li>Offline Web Applications</li>
            <li>Offline Web Applications</li>
            <li>Memory pair game — real project!</li>
            <li>Website Performance Optimization</li>
            <li>Friends App - real project!</li>
        </ol>`
        content.appendChild(advancedContent);
        
        contentTitle();
    }   
});
    

