import {Action} from "../types/action";
import {ActionTypes} from "../actions/unsplash";
import {Image} from "../types/API";
import {Sort} from "../Components/searchForm";

interface UnsplashState {
    items: Array<Image>;
    item: object;
    total: number;
    totalPages: number;
    currentPage: number;
}

const INITIAL_STATE={
    items: [],
    item: {},
    total: 0,
    totalPages: 0,
    currentPage: 0,
    searchInput: "",
    filterInput: "",
    radioInput: Sort.ASC
};

export const unsplash = (state: UnsplashState = INITIAL_STATE, action: Action<ActionTypes, any>) => {
    switch(action.type) {
        case ActionTypes.SUBMIT:
            return { ...state, ...action.payload };

        case ActionTypes.FETCH:
            const items = [...state.items, ...action.payload.items];
            return { ...state, ...action.payload, items };

        case ActionTypes.FILTER:
            return { ...state, ...action.payload };

        case ActionTypes.IMAGE:
            return { ...state, item: action.payload };

        default:
            return state;
    }
};

