const human = (props) => {
    let defaultProperties = {
        species: 'human',
        arms: '2',
        legs: '2',
    }
    return Object.assign(defaultProperties, props);
}

const cat = (props) => {
    let defaultProperties = {
        species: 'cat',
        paws: 4
    }
    return Object.assign(defaultProperties, props, meower(props.sound));
}

const dog = (props) => {
    let defaultProperties = {
        species: 'dog',
        sound: 'barking',
        paws: 4
    }
    return Object.assign(defaultProperties, props)
}

const catWomen = (props) => {
    return Object.assign(human(props), meower(props.sound));
}

function meower(arg) {
    return { sound: arg || 'Moewing' }
}

const inhabitantMethods = {
    setFriendship (friends) {
        this.friends = [...friends]
    },

    toString() {
        return Object.entries(this)
        .map((value) => {
            if (value[0] === 'friends') {
                return `<strong>friends:</strong> ${value[1].map(el => el.name)}`
            } else {
                return `<strong>${value[0]}:</strong> ${value[1]}`
            }
        })
        .join('; ')
    }
}

const inhabitants = {}

spawnInhabitant(human, {name: 'jhon', sex: 'male', sound: 'How your doin\''});
spawnInhabitant(human, {name: 'whitney', sex: 'female', sound: 'Hi guys'});
spawnInhabitant(cat, {name: 'houston', sex: 'male'});
spawnInhabitant(dog, {name: 'rex', sex: 'male'});
spawnInhabitant(catWomen, {name: 'selina', sex: 'female'});

inhabitants.selina.setFriendship([inhabitants.whitney, inhabitants.houston]);
inhabitants.houston.setFriendship([inhabitants.selina, inhabitants.whitney]);
inhabitants.whitney.setFriendship([inhabitants.houston]);

function spawnInhabitant(constructor, objectProperties) {
    inhabitants[objectProperties.name] = Object.setPrototypeOf(constructor(objectProperties), inhabitantMethods);
}

for (let key in inhabitants) {
    console.log(print(inhabitants[key]));
}