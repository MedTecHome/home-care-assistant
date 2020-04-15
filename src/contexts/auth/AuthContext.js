import React, {createContext, useEffect, useState} from "react";
import firebase from "../../firebase.config";
const auth = firebase.auth();

export const AuthContext = createContext();

export function AuthContextProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(observableUser => {
            if(observableUser){
                setCurrentUser(auth.currentUser)
            }else {
                setCurrentUser(null)
            }
        });
    }, []);

    return <AuthContext.Provider value={{
        currentUser
    }}>
        {children}
    </AuthContext.Provider>
}

