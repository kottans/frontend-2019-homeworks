
fetch("./data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    data = json;
    makeSideBar(data);
    makePageContent(0);
  })
  .catch(alert);
 function makeSideBar(data) {
  let menuItem = document.getElementsByTagName("li");
  let nav = document.getElementById("sideMenu");
  for (let i in data) {
    menuItem[i].textContent = data[i].heading;
    menuItem[i].id = data[i].id
  }
  nav.addEventListener("click", function (event) {
    let target = event.target; //catch
    content = target.getAttribute("data-content");
    let arr = target.id.split('/');
    let index = arr[arr.length - 1];
    if (content) {
      makePageContent(index);
    }
  }
  );
}
 function makePageContent(index) {
  let main = document.querySelector(".main");
  let div = document.createElement("div");
  main.innerHTML = "";
  div.innerHTML = data[index].text;
  main.appendChild(div);
} 
  