import {useState, useContext, createContext} from "react"

const CommunityContext = createContext();

export const CommunityProvider = ({children}) => {

    return (
        <CommunityContext.Provider
        value={{
            
        }}
        >
            {children}
        </CommunityContext.Provider>
    )
}

export const useCommunity = () => {
    return useContext(CommunityContext)
}