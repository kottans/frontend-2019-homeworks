import {Action} from "../types/action";
import {AUTH_ACTION_TYPES} from "../actions/auth";

interface authState {
    isAuthenticated: boolean;
    token: string

}

const INITIAL_STATE = {
    isAuthenticated: false,
    token: ''
};

export const auth = (state: authState = INITIAL_STATE, action: Action<AUTH_ACTION_TYPES, any>) => {
    switch(action.type) {
        case AUTH_ACTION_TYPES.TOKEN:
            const isAuthenticated = true;
            const token = action.payload.access_token;
            return {...state, token, isAuthenticated};
        default:
            return state;
    }
}
