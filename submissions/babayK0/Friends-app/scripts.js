const FRIENDS_API = "https://randomuser.me/api/?results=30";
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

fetch(FRIENDS_API).then(response => response.json()).then(json => {
    users = json.results;
    makeFriend(users);
});

function makeFriend(users) {
	const CONTENT_FRAGMENT = document.createDocumentFragment();

	function makeUser(element){

		const USER_CONTAINER = document.createElement('div');
		const INFO_CONTAINER = document.createElement('div');
		const PHOTO_CONTAINER = document.createElement('div');
		const PHOTO = document.createElement('img');
		const NAME = document.createElement('p');
		const AGE = document.createElement('p');
		const MAIL = document.createElement('a');
		const PHONE = document.createElement('div');
		const HOME = document.createElement('p');
		makeContent(PHOTO,NAME,AGE,MAIL,PHONE,HOME)
	

		function makeContent(PHOTO,NAME,AGE,MAIL,PHONE,HOME){
			PHOTO.setAttribute('src', element.picture.large);
			NAME.innerHTML=`${element.name.first} ${element.name.last}`;
			AGE.innerHTML=`Age: ${element.dob.age}`;
			MAIL.href=`mailto:${element.email}`;
			MAIL.innerHTML=`Mail me ! `+(ICONS.mail);
			PHONE.innerHTML=`Call me ! `
			+`<a href="tel:${element.phone}" title="${element.phone}">${ICONS.phone}</a>`;
			HOME.innerHTML=(`${element.location.city}`)
			+(ICONS.home);
			addCSS(USER_CONTAINER,INFO_CONTAINER,PHOTO_CONTAINER,
					PHOTO,NAME,AGE,MAIL,PHONE,HOME)
		}

		function addCSS(USER_CONTAINER,INFO_CONTAINER,PHOTO_CONTAINER,
					PHOTO,NAME,AGE,MAIL,PHONE,HOME){
			USER_CONTAINER.classList.add('user_container');
			INFO_CONTAINER.classList.add('info_container');
			PHOTO_CONTAINER.classList.add('photo_container')
			PHOTO.classList.add('photo');
			NAME.classList.add('name');
			AGE.classList.add('age');
			MAIL.classList.add('mail');
			PHONE.classList.add('phone');
			HOME.classList.add('home');
			renderUser(CONTENT_FRAGMENT,USER_CONTAINER,
						INFO_CONTAINER,PHOTO_CONTAINER)
		}

		function renderUser(){
			CONTENT_FRAGMENT.appendChild(USER_CONTAINER);
			USER_CONTAINER.appendChild(INFO_CONTAINER);
			INFO_CONTAINER.appendChild(PHOTO_CONTAINER);
			PHOTO_CONTAINER.appendChild(PHOTO);
			INFO_CONTAINER.appendChild(NAME);
			INFO_CONTAINER.appendChild(AGE);
			INFO_CONTAINER.appendChild(MAIL);
			INFO_CONTAINER.appendChild(PHONE);
			INFO_CONTAINER.appendChild(HOME);

		}
	}

	users.forEach(makeUser);
	CONTENT.appendChild(CONTENT_FRAGMENT);
}


SORT_AGE.addEventListener("click", function ({target}){
	if(target.value=="age-asc"){
		users.sort(function(a,b){
			return a.dob.age - b.dob.age;
		});
	}else if(target.value=="age-desc"){
		users.sort(function(a,b){
			return b.dob.age - a.dob.age;
		});
	}
	showSorted(users);
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
	users = sortName(users);
	if(target.value=="name-za"){
		users.reverse();
	}
	showSorted(users);
});

SORT_SEX.addEventListener("click", function ({target}){
	if(target.value=="man"||target.value=="woman"||target.value=="all") showSorted(users);
});

SEARCH.addEventListener("input",function(){
	showSorted(users);
});

function showSorted(users){
	let sortedUsers = [];

	users.forEach(function(element){
		let fullName = `${element.name.first}${element.name.last}`;
		let isIncludesFullname = fullName.includes(SEARCH.value.toLowerCase());

		if(!isIncludesFullname) return;
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
	CONTENT.innerHTML='';
	makeFriend(sortedUsers);
}

RESET.addEventListener("click",function({target}){
	RADIO.forEach(function(radiobtn){
		radiobtn.checked= false;
	});
	ALL.checked=true;
	SEARCH.value='';
	showSorted(users);	
});
