const FRIENDS_API_URL = "https://randomuser.me/api/?results=20&nat=us";
const friendsContainer = document.getElementById("show-friends");
let listOfFriendsAll = [];

const showFriends = friends => {
	friendsContainer.innerHTML = "";
	friends.forEach(friend => {
		const friendContainer = document.createElement("div");
		let img = document.createElement("img");
		img.src = friend.picture.large;	
		let name  = document.createElement("p");
		name.textContent = (`${friend.name.first} ${friend.name.last}`);
		name.classList.add("friend-name");		
		let age = document.createElement("p");
		age.textContent = `I have ${friend.dob.age} years old`;
		let loc = document.createElement("p");
		loc.textContent = friend.location.state + " " + friend.location.city;
		let email = document.createElement("div");
		email.textContent = friend.email;
		email.classList.add("email");
		friendContainer.append(img, name, age,loc, email); 
		friendContainer.classList.add("person-card");
		friendsContainer.append(friendContainer);
	});
}

const friendsListInit = listOfFriends => {
	listOfFriendsAll = [...listOfFriends];	
	let filterParams = {
		gender: "",
		sortNameAge: "",
		searchFriend: ""
	};	
	addListenersToForm(filterParams);
	showFriends(listOfFriendsAll);
}

const addListenersToForm = (filterParams) => {
	document.querySelector(".search-form").addEventListener("change", ({target}) => {
		if(target.name === "gender") {
			filterParams.gender = target.value;
		}
		if(target.name === "sort") {
			filterParams.sortNameAge = target.value;
		}
		filterFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector(".search-text").addEventListener("input", ({target}) => {
		filterParams.searchFriend = target.value;
		filterFriends(listOfFriendsAll, filterParams);
	});
	document.querySelector("[type=reset]").addEventListener("click", resetFilter);
}

const filterFriends = (listOfFriends, filterParams) => {
	let filteredFriends = [...listOfFriends];
	
	switch(filterParams.gender){
		case "male":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "male");
			break;
		case "female":
			filteredFriends = filteredFriends.filter(friend => friend.gender === "female");
			break;
	}
	
 	switch(filterParams.sortNameAge){
		case "nameAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => (friend.name.first > friendNext.name.first ? 1 : -1) || 0);
			break;
 		case "nameDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => (friend.name.first < friendNext.name.first ? 1 : -1) || 0);
			break;
		case "ageAsc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friend.dob.age - friendNext.dob.age);
			break;
		case "ageDesc":
			filteredFriends = filteredFriends.sort((friend, friendNext) => friendNext.dob.age - friend.dob.age);
			break; 
	}
	
	if (filterParams.searchFriend){
		filteredFriends = filteredFriends.filter(
			({name}) => name.first.includes(filterParams.searchFriend) || name.last.includes(filterParams.searchFriend)
		);
	}	
	
	showFriends(filteredFriends);
}

const resetFilter = () => {
	filterParams = {
			gender: "",
			sortNameAge: "",
			searchFriend: ""
		};
	frendsAppInit();
}

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

const frendsAppInit = () => {
fetch(FRIENDS_API_URL)
	.then(handleErrors)
	.then(response => response.json())
    .then(data => friendsListInit(data.results) )
    .catch(error => friendsContainer.innerHTML = error.message ); 
}

window.onload = frendsAppInit();
