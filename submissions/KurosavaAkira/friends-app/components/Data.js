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
    constructor(friend, id, visible = true) {
        this.id = id;
        this.photo = friend.picture.large;
        this.name = `${friend.name.first} ${friend.name.last}`;
        this.age = friend.dob.age;
        this.phone = friend.cell;
        this.visible = visible;
    }
} 

const createFriendsList = async () => {
    const raw_friends_list = await getFriends();
    friends = raw_friends_list.map((friend, i) => new Friend(friend, i + 1));
	return friends;
}


export { createFriendsList, friends as friendsData };