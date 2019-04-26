import {getImages} from "../api";

export enum ActionTypes {
    FETCH = '@unsplash/fetch',
    FILTER = '@unsplash/filter',
    SUBMIT = '@unsplash/submit',
    IMAGE = '@image/fetsh'
}

export const fetchItems = (payload: {searchInput: string, currentPage: number}):any  => {
    return async (dispatch:any) => {
        const response = await getImages(payload.searchInput, payload.currentPage);
        dispatch({
            type: ActionTypes.FETCH,
            payload: {...response, searchInput: payload.searchInput, currentPage: payload.currentPage}
        });
    };
};