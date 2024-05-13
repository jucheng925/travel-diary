import { Cloudinary } from "@cloudinary/url-gen/index";
import { createContext, useState } from "react";


const CloudinaryContext = createContext({});

const CloudinaryProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
  
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'wanderlog'
        }
      });
  
    // const logout = () => {
    //   fetch("/api/logout", {
    //     method: "DELETE",
    //     })
    //     .then(() => setCurrentUser(null))
    // }

    // const updatedUser = (values, checkBackendErrors) => {
    //   fetch("/api/updatecurrentuser", {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type" : "application/json",
    //         "Accept" : "application/json"
    //     },
    //     body: JSON.stringify(values)
    //   })
    //   .then(resp => {
    //     if (resp.ok) {
    //       resp.json().then(data => setCurrentUser(data))
    //     } else {
    //       resp.json().then(data => checkBackendErrors(data))
    //     }
    //   })
    // }

    // const userAddedTrip = (newAttendanceObj) => {
    //   const newAttendancesList = [...currentUser.attendances, newAttendanceObj]
    //   setCurrentUser({...currentUser, attendances: newAttendancesList})
    // }

    // const contextAddPost = (newPost) => {
    //   const newPostList = [...currentUser.posts, newPost]
    //   setCurrentUser({...currentUser, posts: newPostList})
    // }

    // const contextDeletePost = (deletePostId) => {
    //   const updatedPosts = currentUser.posts.filter((post) => post.id !== deletePostId)
    //   setCurrentUser({...currentUser, posts: updatedPosts})
    // }

    // const contextEditPost = (editPost) => {
    //   const updatedPosts = currentUser.posts.map((post)=> {
    //     if (post.id === editPost.id) {
    //       return editPost 
    //     } else {
    //       return post
    //     }
    //   })
    //   setCurrentUser({...currentUser, posts: updatedPosts})
    // }

    return (
        <CloudinaryContext.Provider 
          value={{cld}}>
            { children }
        </CloudinaryContext.Provider>
      )
  }
  
export { CloudinaryContext, CloudinaryProvider }