import {ActionTypes} from "./unsplash";

export const filterActionCreator = (payload: { filterInput: string, sortingParam: string }): any => {
    return (dispatch: any) => {
        dispatch({
            type: ActionTypes.FILTER,
            payload: payload
        });
    };
};
