import { useReducer } from "react";
import { authReducer } from "./authReducer";
import { AuthContext } from "./AuthContext";
import { types } from "../types";

const init = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return {
        logged: !!user,
        user
    }
};

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(
        authReducer,
        {
            logged: false,
        },
        init
    );

    const login = (name = "") => {
        const user = { name };
        const action = {
            type: types.login,
            payload: user,
        };
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(action);
    };

    const logout = () => {
        const action = {
            type: types.logout,
        };
        localStorage.removeItem("user");
        dispatch(action);
    };

    return (
        <AuthContext.Provider
            value={{
                ...authState,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
