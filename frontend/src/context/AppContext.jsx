import { createContext, useState } from "react";

export const AppContent = createContext()

export const AppContextProvider = (props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const[isLoggedin, setIsLoggedin] = useState(false)
    const[userData, setUserData] = useState(false)

    const value ={
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}