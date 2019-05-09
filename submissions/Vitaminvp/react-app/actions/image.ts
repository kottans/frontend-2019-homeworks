import {getImage} from "../api";
import {ActionTypes} from "./unsplash";

export const fetchImage = (payload: { imageId: string }): any => {
    return async (dispatch: any) => {
        const response = await getImage(payload.imageId);
        dispatch({
            type: ActionTypes.IMAGE,
            payload: {...response}
        });
    };
};

