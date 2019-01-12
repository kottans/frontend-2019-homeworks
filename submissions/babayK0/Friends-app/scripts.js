const FRIENDS_API = "https://randomuser.me/api/?results=30";
const GET_FRIENDS = fetch(FRIENDS_API);
const ICONS = {
    phone: "<i class=\"fas fa-phone icon\"></i>",
    mail: "<i class=\"fas fa-envelope icon\"></i>",
    home: "<i class=\"fas fa-home icon\"></i>"
};

const CONTENT = document.querySelector(".content");
const SEARCH = document.querySelector(".search");
const RADIO = document.querySelectorAll(".radio");
const SORT_SEX = document.querySelector(".sort_sex");
const SORT_AGE = document.querySelector(".sort_age");
const SORT_NAME = document.querySelector(".sort_name");
const MAN = document.getElementById("man");
const WOMAN = document.getElementById("woman");
const ALL = document.getElementById("all");
const RESET = document.querySelector(".reset");

let users = [];

GET_FRIENDS.then(response => response.json()).then(json => {
    users = json.results;
    makeFriend(users);
});

function makeFriend(users) {
	const CONTENT_FRAGMENT = document.createDocumentFragment();
	users.forEach( element => {
		const USER_CONTAINER = document.createElement('div');
		USER_CONTAINER.classList.add('user_container');
		CONTENT_FRAGMENT.appendChild(USER_CONTAINER);

		const INFO_CONTAINER = document.createElement('div');
		INFO_CONTAINER.classList.add('info_container');
		USER_CONTAINER.appendChild(INFO_CONTAINER);

		const PHOTO_CONTAINER = document.createElement('div');
		PHOTO_CONTAINER.classList.add('photo_container')
		INFO_CONTAINER.appendChild(PHOTO_CONTAINER);

		const PHOTO = document.createElement('img');
		PHOTO.classList.add('photo');
		PHOTO.setAttribute('src', element.picture.large);
		PHOTO_CONTAINER.appendChild(PHOTO);

		const NAME = document.createElement('p');
		NAME.innerHTML=(`${element.name.first} ${element.name.last}`).toUpperCase();
		NAME.classList.add('name');
		INFO_CONTAINER.appendChild(NAME);

		const AGE = document.createElement('p');
		AGE.innerHTML=`Age: ${element.dob.age}`;
		AGE.classList.add('age');
		INFO_CONTAINER.appendChild(AGE);

		const MAIL = document.createElement('a');
		MAIL.href=`mailto:${element.email}`;
		MAIL.innerHTML=`Mail me ! `+(ICONS.mail);
		MAIL.classList.add('mail');
		INFO_CONTAINER.appendChild(MAIL);

		const PHONE = document.createElement('div');
		PHONE.innerHTML=`Call me ! `
		+`<a href="tel:${element.phone}" title="${element.phone}">${ICONS.phone}</a>`;
		PHONE.classList.add('phone');
		INFO_CONTAINER.appendChild(PHONE);

		const HOME = document.createElement('p');
		HOME.innerHTML=(`${element.location.city}`).toUpperCase()
		+(ICONS.home);
		HOME.classList.add('home');
		INFO_CONTAINER.appendChild(HOME);
	});
	CONTENT.appendChild(CONTENT_FRAGMENT);
}

SORT_AGE.addEventListener("click", function ({target}){
	switch(target.value){
		case "age-asc":
			users.sort(function(a,b){
				return a.dob.age - b.dob.age;
			})
			showSorted(users);
			break;
		case "age-desc": 
			users.sort(function(a,b){
				return b.dob.age - a.dob.age;
			})
			showSorted(users);
			break;
	}
});

function sortName(users){
	users.sort(function(a, b){
	    if(a.name.first.toLowerCase() < b.name.first.toLowerCase()) { return -1; }
	    if(a.name.first.toLowerCase() > b.name.first.toLowerCase()) { return 1; }
	    return 0;
	});
	return users;
}
SORT_NAME.addEventListener("click", function ({target}){
	switch(target.value){
		case "name-az":
			users = sortName(users);
			showSorted(users);
			break;
		case "name-za":
			users = sortName(users);
			showSorted(users.reverse());
			break;
	}
});


SORT_SEX.addEventListener("click", function ({target}){
	switch(target.value){
		case "man":
			showSorted(users);
			break;
		case "woman":
			showSorted(users);
			break;
		case "all":
			showSorted(users);
			break;
	}
});

SEARCH.addEventListener("input",function({target}){
	showSorted(users);
});

function showSorted(users){
	let sortedUsers = [];
	users.forEach(function(element){
		if(!`${element.name.first}${element.name.last}`
		.includes(SEARCH.value.toLowerCase())) return;
		if(MAN.checked){
			if(element.gender==="male"){
				sortedUsers.push(element);
				return sortedUsers;
			}
		}
		if(WOMAN.checked){
			if(element.gender==="female"){
				sortedUsers.push(element);
				return sortedUsers;
			}
		}
		if(ALL.checked){
			if(element.gender==="female"||element.gender==="male"){
				sortedUsers.push(element);
				return sortedUsers;
			}
		}		
	});
	console.log(sortedUsers);
	CONTENT.innerHTML='';
	makeFriend(sortedUsers);
}

RESET.addEventListener("click",function({target}){
	console.log(target);
	let radio = Array.prototype.slice.call(RADIO);
	radio.forEach(function(radiobtn){
		radiobtn.checked= false;
	});
	ALL.checked=true;
	SEARCH.value='';
	showSorted(users);	
});