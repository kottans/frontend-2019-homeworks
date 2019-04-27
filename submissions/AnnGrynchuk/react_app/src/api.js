export const getFriendList = async () => {
    const data = await fetch('https://randomuser.me/api/?results=15');
    const result = await data.json();
    return result.results;
}
