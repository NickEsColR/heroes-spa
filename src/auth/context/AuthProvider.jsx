import { useReducer } from "react";
import { authReducer } from "./authReducer";
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {

    const [authState,dispatch] = useReducer(authReducer, {
        logged:false,
    })

    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
