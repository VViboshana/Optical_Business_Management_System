import { createContext } from "react";

export const AppContext=createContext()
const AppContextProvider = (props) => {

    const currencySymbol='Rs.'
    const value ={
        currencySymbol
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider