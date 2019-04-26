import {getImages} from "../api";
import {ActionTypes} from "./unsplash";


export const fetchInitItems = (payload: {searchInput: string, currentPage: number}):any  => {
    return async (dispatch:any) => {
        const response = await getImages(payload.searchInput, payload.currentPage);
        dispatch({
            type: ActionTypes.SUBMIT,
            payload: {...response, searchInput: payload.searchInput, currentPage: payload.currentPage}
        });
    };
};