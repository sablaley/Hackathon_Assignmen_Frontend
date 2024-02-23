import React, {createContext, useState} from 'react'
export const LoginContext = createContext("")

const Context = ({children}) => {
    const [contextData, setContextData] = useState("")
    return (
        <>
        <LoginContext.Provider value={{contextData, setContextData}}>
            {children}
        </LoginContext.Provider>
        </>
    )
}
export default Context