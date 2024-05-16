import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const getInitialState = () => {
  const currentUser = sessionStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null

}

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(getInitialState);

    useEffect(() => {
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
    }, [currentUser])
  
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

    const userAddedTrip = (newAttendanceObj) => {
      const newAttendancesList = [...currentUser.attendances, newAttendanceObj]
      setCurrentUser({...currentUser, attendances: newAttendancesList})
    }

    const userEditTrip = (newTripObj) => {
      const updatedAttendancesList = currentUser.attendances.map((attendance) => {
        if (attendance.trip.id == newTripObj.id) {
          return {...attendance, trip: newTripObj}
        } else {
          return attendance
        }
      })
      setCurrentUser({...currentUser, attendances: updatedAttendancesList})
    }

    const contextAddPost = (newPost) => {
      const newPostList = [...currentUser.posts, newPost]
      setCurrentUser({...currentUser, posts: newPostList})
    }

    const contextDeletePost = (deletePostId) => {
      const updatedPosts = currentUser.posts.filter((post) => post.id !== deletePostId)
      setCurrentUser({...currentUser, posts: updatedPosts})
    }

    const contextEditPost = (editPost) => {
      const updatedPosts = currentUser.posts.map((post)=> {
        if (post.id === editPost.id) {
          return editPost 
        } else {
          return post
        }
      })
      setCurrentUser({...currentUser, posts: updatedPosts})
    }

    return (
        <UserContext.Provider 
          value={{currentUser, login, logout, updatedUser, userAddedTrip, userEditTrip, contextAddPost, contextEditPost, contextDeletePost}}>
            { children }
        </UserContext.Provider>
      )
  }
  
export { UserContext, UserProvider }