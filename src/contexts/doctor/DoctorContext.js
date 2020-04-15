import React, {createContext, useReducer} from "react";
import axios from 'axios';
import DoctorReducers, {initialState} from "./DoctorReducers";
import {SigInUserToApplication} from "../auth/LoginActions";

export const DoctorContext = createContext();

export function DoctorContextProvider({children}) {
    const [state, dispatch] = useReducer(DoctorReducers, initialState);

    const DoctorsAction = {
        SelectDoctor: async (id) => {

        }
    };

    return <DoctorContext.Provider value={{
        state,
        ...DoctorsAction
    }}>
        {children}
    </DoctorContext.Provider>
}