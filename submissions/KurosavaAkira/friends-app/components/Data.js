let friends = [];

const getFriends = async () => {
    const NUMBER_OF_FRIENDS = 35;
	const FRIENDS_API_LINK = `https://randomuser.me/api/?results=${NUMBER_OF_FRIENDS}`;
	try {
		const response = await fetch(FRIENDS_API_LINK);
		if (!response.ok) {
			throw new Error(response.statusText);
        }
        let data = await response.json()
		return data.results;
	} catch(err) {
		return err;
	}
}

class Friend {
    constructor(photo, name, age, phone, visible = true) {
        this.id = Friend.id();
        this.photo = photo;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.visible = visible;
    }

    static id() {
        return friends.length + 1;
    }
} 

const createFriendsList = async () => {
    const RAW_FRIENDS_LIST = await getFriends();
	RAW_FRIENDS_LIST.forEach(friend => {
		let new_friend = new Friend(friend.picture.large, `${friend.name.first} ${friend.name.last}`, friend.dob.age, friend.cell);
		friends.push(new_friend);
	});
	return friends;
}

export { createFriendsList, friends as friendsData };