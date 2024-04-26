import { useReducer } from "react";
import { authReducer } from "./authReducer";
import { AuthContext } from "./AuthContext";
import { types } from "../types";


export const AuthProvider = ({ children }) => {

    const [authState,dispatch] = useReducer(authReducer, {
        logged:false,
    })

    const login = (name = '') => {
        const action = {
            type: types.login,
            payload: {
                name
            }
        }

        dispatch(action);
    }

    return <AuthContext.Provider value={{
        ...authState,
        login
    }}>{children}</AuthContext.Provider>;
};
