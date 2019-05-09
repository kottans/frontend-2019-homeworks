import {Dispatch} from "redux";
import {fetchToken} from "../api";
import {Action} from "../types/action";
import {FetchTokenResponse} from "../types/API";

export enum AUTH_ACTION_TYPES {
    TOKEN = '@auth/token'
}

export type AuthAction = Action<AUTH_ACTION_TYPES, { [key: string]: any }>;

const dispatchToken = (payload: FetchTokenResponse) => ({
    type: AUTH_ACTION_TYPES.TOKEN,
    payload
});

export const setToken = (code: string): any => async (dispatch: Dispatch<AuthAction>) => {

    const responseData = await fetchToken(code);
    dispatch(dispatchToken(responseData));
};
