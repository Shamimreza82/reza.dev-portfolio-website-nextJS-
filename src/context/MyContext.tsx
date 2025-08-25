"use client"

import { createContext, ReactNode, useContext, useState } from "react"

type MyContextProps = {
    user: string | null, 
    setUser: (user:string | null) => void
}; 


const MyContext = createContext<MyContextProps | undefined>(undefined); 

export const MyContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<string | null>(null); 

    const data = {
        user, 
        setUser
    }

    return (
        <MyContext.Provider value={data}>
            {children}
        </MyContext.Provider>
    )

}

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used inside MyContextProvider");
  return context;
};
