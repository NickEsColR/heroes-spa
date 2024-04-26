import { types } from "../types";

export const authReducer = (state = {},action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state,
                logged: true,
                name: action.payload,
            }
        case types.logout:
            return {
                ...state,
                logged: false,
            }
        default:
            return state;
    }
}