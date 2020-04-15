import React, {createContext, useReducer} from "react";
import {initialLoginState, LoginReducers} from "./LoginReducer";
import {SignInUserToApplication} from "./LoginActions";

export const LoginContext = createContext();

export function LoginContextProvider({children}) {
    const [state, dispatch] = useReducer(LoginReducers, initialLoginState);

    const DoctorsAction = {
        SignIn: (params) => dispatch(SignInUserToApplication(params))

    };

    return <LoginContext.Provider value={{
        state,
        ...DoctorsAction
    }}>
        {children}
    </LoginContext.Provider>
}

