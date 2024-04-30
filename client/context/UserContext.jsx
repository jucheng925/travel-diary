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

    const updatedUser = (values, checkBackendErrors) => {
      fetch("/api/updatecurrentuser", {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(values)
      })
      .then(resp => {
        if (resp.ok) {
          resp.json().then(data => setCurrentUser(data))
        } else {
          resp.json().then(data => checkBackendErrors(data))
        }
      })
    }
    
    return (
        <UserContext.Provider 
          value={{currentUser, login, logout, updatedUser}}>
            { children }
        </UserContext.Provider>
      )
  }
  
export { UserContext, UserProvider }