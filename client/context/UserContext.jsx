import { createContext, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
  
    const login = (user) => {
      setCurrentUser(user)
    }
  
    const logout = () => {
      fetch("/api/logout", {
        method: "DELETE",
        })
        .then(() => setCurrentUser(null))
    }
    

    return (
        <UserContext.Provider 
          value={{currentUser, login, logout}}>
            { children }
        </UserContext.Provider>
      )
  }
  
export { UserContext, UserProvider }