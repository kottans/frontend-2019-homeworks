const API_RANDOM_USER = 'https://randomuser.me/api/?results=30';
const MIN_AGE = 0;
const MAX_AGE = 0;

function renderCardItem (item,index)  {
    return `
    <div class="friendCardItem" id="card${index}">
    <div class="friendCardPhoto" style="background-image: url(${item.picture.thumbnail}) "></div>
    <div class="friendCardText">${item.name.first} ${item.name.last}<br>Age: ${item.dob.age}</div>
</div>`
}

function drawRenderCardList (list) {
    document.getElementById('container').innerHTML =  list.map((item, index) => renderCardItem(item)).join('');
}

var friendsList = [];

(async ()=>{

            await fetch(`${API_RANDOM_USER}` )
            .then(response => response.json())
            .then(data => {
                friendsList = data.results;
            });

    drawRenderCardList(friendsList);

})();

function filterArray(list){
    let lower = document.getElementById("lowerAge").value;
    let upper = document.getElementById("upperAge").value;
    let name = document.getElementById('searchName').value;
    lower = (lower === '') ? MIN_AGE : +lower;
    upper = (upper === '') ? MAX_AGE : +upper;
    name = name.toLowerCase();
    return list.filter((item) => {
        return (item.dob.age >= lower && item.dob.age <= upper) && (item.name.first.indexOf(name) > -1 || item.name.last.indexOf(name) > -1)
    })


}


function sortByName(list,way) {

    return list.sort((a,b) => {
        if (a.name.last === b.name.last) return (a.name.first > b.name.first) ? 1 : -1;
        if (way) return (a.name.last > b.name.last) ? 1 : -1
            else return (a.name.last > b.name.last) ? -1 : 1
    })
}


function sortByAge(list, way) {
    return list.sort((a,b) => {
        if (way) return (new Date(a.dob.date) > new Date(b.dob.date)) ? 1 : -1
        else return (new Date(a.dob.date) > new Date(b.dob.date)) ? -1 : 1
    })
}



document.getElementById('nameAsc').addEventListener("click", () => drawRenderCardList(sortByName(filterArray(friendsList),true)));
document.getElementById('nameDesc').addEventListener("click", () => drawRenderCardList(sortByName(filterArray(friendsList),false)));
document.getElementById('ageAsc').addEventListener("click", () => drawRenderCardList(sortByAge(filterArray(friendsList),false)));
document.getElementById('ageDesc').addEventListener("click", () => drawRenderCardList(sortByAge(filterArray(friendsList),true)));
document.getElementById('searchName').addEventListener("input", (event) => drawRenderCardList(filterArray(friendsList)));
document.getElementById('filterAge').addEventListener("click", () => drawRenderCardList(filterArray(friendsList)));


