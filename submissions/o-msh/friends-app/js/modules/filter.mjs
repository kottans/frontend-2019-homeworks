import { generateCards } from "./user.mjs";
import { state, initFriends } from "./state.mjs";
import f from "./functions.mjs";

const asc = (a, b) => a < b ? -1 : 1;

const desc = (a, b) => a < b ? 1 : -1;

const search = (data, value) => data.filter(obj => [obj.name.first].join().toUpperCase().includes(value.toUpperCase()));

const byGender = (data, value) => data.filter(obj => obj.gender.toUpperCase() === value.toUpperCase());

const sortFriends = ([...data], value, type) => {
    switch (value) {
        case "asc":
            return data.sort((a, b) => {
                if (type === "name") {
                    return asc(a.name.first, b.name.first);
                } else {
                    return asc(a.dob.age, b.dob.age);
                }
            });
            break;
        case "desc":
            return data.sort((a, b) => {
                if (type === "name") {
                    return desc(a.name.first, b.name.first);
                } else {
                    return desc(a.dob.age, b.dob.age);
                }
            });
            break;
        default:
            state.friends;
            break;
    }
};

export const controller = () => state.filters.reduce((data, filter) => filter.callback(data, filter.value), state.friends);

export const prepare = options => {
    let filterIndex = state.filters.findIndex(obj => obj.name === options.name);
    if (filterIndex != "-1") {
        state.filters[filterIndex].callback = options.callback;
        state.filters[filterIndex].value = options.value;
    } else {
        state.filters.push(options);
    }
};

export const resetFilters = () => {
    state.filters = [];
    state.dom.radio.map(radio => radio.checked = false && radio.checked);
    state.dom.search.value = "";
};

export const searchHandler = e => {
    prepare({ name: "search", callback: search, value: e.target.value });
    f.render(generateCards(controller()));
};

export const sortHandler = e => {
    let target = e.target;
    if (target.type === "radio") {
        let radioName = target.name;
        let radioValue = target.value;
        let radioType = target.dataset.type;
        let callback = null;
        switch (radioName) {
            case "gender":
                callback = byGender;
                break;
            case "sort":
                callback = (data, value) => sortFriends(data, value, radioType);
                break;
            default:
                break;
        }
        prepare({ name: radioName, callback, value: radioValue });
        f.render(generateCards(controller()));
    }
    if (target.matches("[data-type=fetch]") || target.matches("[data-type=reset]")) {
        let type = target.dataset.type;
        resetFilters();
        f.cleanMain();
        switch (type) {
            case "fetch":
                initFriends();
                break;
            case "reset":
                f.render(generateCards(controller()));
                break;
            default:
                break;
        }
    }
};
