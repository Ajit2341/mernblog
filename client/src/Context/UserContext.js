import { createContext, useState } from "react";

export const userContext = createContext({});

export const UserContextProvider = ({children})=>{

  const [userInfo, setuserInfo] = useState({})

    return(
    <userContext.Provider value={{userInfo, setuserInfo}}>

  {children}

    </userContext.Provider>
  
    )
}
