import { createContext, useState } from "react";
import {Cloudinary} from "@cloudinary/url-gen";

const CloudinaryContext = createContext({});

const CloudinaryProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'wanderlog'
        }
    });

    

    return (
        <CloudinaryContext.Provider 
          value={{currentUser, cld}}>
            { children }
        </CloudinaryContext.Provider>
      )
  }
  
export { CloudinaryContext, CloudinaryProvider }