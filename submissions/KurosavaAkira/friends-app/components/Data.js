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
    constructor(friend, id, isVisible = true) {
        this.id = id;
        this.photo = friend.picture.large;
        this.name = `${friend.name.first} ${friend.name.last}`;
        this.age = friend.dob.age;
        this.phone = friend.cell;
        this.isVisible = isVisible;
    }
} 

const createFriendsList = async () => {
    const rawFriendsList = await getFriends();
    friends = rawFriendsList.map((friend, i) => new Friend(friend, i + 1));
	return friends;
}

const recalculateCardPositions = friends => {
// Starting position begins at the left top corner just below the header.
// Each new items is generated from left to right. 
// After every 7 items, there will be a new line (+180px).
//
//  y
//  ↑
//  ╎ (0:0)
//  ╎  ▯▯▯▯▯▯▯ 
//  ╎  ▯▯▯▯▯▯▯ 
//  ╎  ▯▯▯▯▯▯▯
//  -----------→x
    const positions = [];
    const itemsInRow = 7;
    let x = 0;
    let y = -180;
  
    for (let i = 0; i < friends.length; i++) {
        // if there is place in a row - add item to row
        if (i % itemsInRow) {
            x += 150;
            
        // if no place in a row - move to new row
        } else {
            y += 180;
            x = 0;
        }
    
        positions.push({ x, y });
    }
  
    return positions;
};

export { createFriendsList, friends as friendsData, recalculateCardPositions };