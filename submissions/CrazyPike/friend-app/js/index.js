function renderCardItem (item,index)  {
    return `
    <div class="friendCardItem" id="card${index}">
    <div class="friendCardPhoto" style="background-image: url(${item.picture.thumbnail}) "></div>
    <div class="friendCardText">${item.name.first} ${item.name.last}<br>Age: ${item.dob.age}</div>
</div>`
}

function drawRenderCardList (list) {
    console.log('!!!');
    document.getElementById('container').innerHTML =  list.map((item, index) => renderCardItem(item)).join('');
}

var friendsList = [];

(async ()=>{

            await fetch('https://randomuser.me/api/?results=30' )
            .then(response => response.json())
            .then(data => {
                friendsList = data.results;
            });
    console.dir(friendsList);
    drawRenderCardList(friendsList);




})();

function sortByName(way) {
    return friendsList.sort((a,b) => {
        if (a.name.last === b.name.last) return (a.name.first > b.name.first) ? 1 : -1;
        if (way) return (a.name.last > b.name.last) ? 1 : -1
            else return (a.name.last > b.name.last) ? -1 : 1
    })
}

function filterByName(name) {
    console.log(name);
    name = name.toLowerCase();
    return friendsList.filter((item) => {
        return (item.name.first.indexOf(name) > -1 || item.name.last.indexOf(name) > -1)
    })
}


function filterByAge(lower,upper) {

    lower = (lower === '') ? 0 : +lower;
    upper = (upper === '') ? 150 : +upper;
    console.log(lower);
    console.log(upper);

    return friendsList.filter((item) => {
        return (item.dob.age >= lower && item.dob.age <= upper)
    })
}


function sortByAge(way) {
    return friendsList.sort((a,b) => {
      //  if (a.name.last === b.name.last) return (a.name.first > b.name.first) ? 1 : -1;
        if (way) return (new Date(a.dob.date) > new Date(b.dob.date)) ? 1 : -1
        else return (new Date(a.dob.date) > new Date(b.dob.date)) ? -1 : 1
    })
}



document.getElementById('nameAsc').addEventListener("click", () => drawRenderCardList(sortByName(true)));
document.getElementById('nameDesc').addEventListener("click", () => drawRenderCardList(sortByName(false)));
document.getElementById('ageAsc').addEventListener("click", () => drawRenderCardList(sortByAge(false)));
document.getElementById('ageDesc').addEventListener("click", () => drawRenderCardList(sortByAge(true)));
document.getElementById('searchName').addEventListener("input", (event) => drawRenderCardList(filterByName(event.target.value)));
document.getElementById('filterAge').addEventListener("click", () => drawRenderCardList(filterByAge(
    document.getElementById("lowerAge").value, document.getElementById("upperAge").value
)))


