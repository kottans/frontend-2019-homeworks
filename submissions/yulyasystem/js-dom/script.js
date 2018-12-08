var selectedLink;
var data;
var index = 0;
fetch("/data.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    data = json;
    makeSideBar(data);
    makePageContent(0);
  })
  .catch(alert); 
  

  function makeSideBar(data){
     var menuItem = document.getElementsByTagName("li");
     var nav = document.getElementById("sideMenu");
      for(var i in data){
        
        menuItem[i].textContent = data[i].heading;
        menuItem[i].id = data[i].id

        console.log(i);

        
        nav.addEventListener("click",function(event){
          
          
          var target = event.target; //catch
          
          content = target.getAttribute("data-content");
          var arr = target.id.split('/');
          var index = arr[arr.length - 1];
          console.log(arr);
          if(content){
            
            console.log(index); 
            makePageContent(index);
            
             //target.className = content;
          }
        }
      );
      }
      

  }

  function makePageContent(index){
    console.log(index);
    var main = document.querySelector(".main");
    var div = document.createElement("div");
    main.innerHTML = "";
    div.innerHTML = data[index].text;
    main.appendChild(div);

  }

  

  