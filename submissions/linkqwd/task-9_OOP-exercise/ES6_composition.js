const human = (props) => {
    let defaultProperties = {
        species: 'human',
        arms: '2',
        legs: '2',
    }
    return Object.assign(defaultProperties, props, canBeFriendly())
}

const cat = (props) => {
    let defaultProperties = {
        species: 'cat',
        paws: 4
    }
    return Object.assign(defaultProperties, props, meower(props.sound), canBeFriendly())
}

const dog = (props) => {
    let defaultProperties = {
        species: 'dog',
        paws: 4
    }
    return Object.assign(defaultProperties, props)
}

const catWomen = (props) => {
    return Object.assign(human(props), meower(props.sound), canBeFriendly())
}

function meower(arg) {
    return { sound: arg || 'Moewing' }
}

const canBeFriendly = () => ({
    setFriendship: function (friends) {
        this.friends = [...friends]
    }
});

let inhabitants = {};

spawnInhabitant(human, {name: 'jhon', sex: 'male', sound: 'How your doin\''});
spawnInhabitant(human, {name: 'whitney', sex: 'female', sound: 'Hi guys'});
spawnInhabitant(cat, {name: 'houston', sex: 'male'});
spawnInhabitant(dog, {name: 'rex', sex: 'male', sound: 'barking'});
spawnInhabitant(catWomen, {name: 'selina', sex: 'female'});

inhabitants.selina.setFriendship([inhabitants.whitney, inhabitants.houston]);
inhabitants.houston.setFriendship([inhabitants.selina, inhabitants.whitney]);
inhabitants.whitney.setFriendship([inhabitants.houston]);

function getInhabitantInfo(inhabitant) {
    let result = '';
    let thingsToShow = ['species', 'name', 'sex', 'arms', 'legs', 'paws', 'sound', 'friends'];

    thingsToShow.forEach((property) => {
        if (inhabitant[property] !== undefined) {
            if (Array.isArray(inhabitant[property])) {
                result += `<strong>${property}:</strong> `
                inhabitant[property].forEach(property => result += `${property.name}, `)
                result = result.slice(0, -2);
                return;
            }
            result += `<strong>${property}:</strong> ${inhabitant[property]}; `
        }
    });
    return result
}

function spawnInhabitant(constructor, objectProperties) {
    inhabitants[objectProperties.name] = constructor(objectProperties);
}

for (let subject in inhabitants) {
    print(getInhabitantInfo(inhabitants[subject]))
}