    
import React ,{useEffect,useState}from 'react'
import ref from "../firebase/firebase"

export const AuthContext =  React.createContext();
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        ref.auth().onAuthStateChanged(setCurrentUser);
    }, [])
    return (
        <AuthContext.Provider
        value={{currentUser}}
        >
            {children}      
        </AuthContext.Provider>  
    )
}

