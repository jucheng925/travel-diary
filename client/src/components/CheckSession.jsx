import {useEffect, useContext} from 'react'
import { UserContext } from '../context/UserContext';

const CheckSession = () => {
    const { login } = useContext(UserContext)

    useEffect(() => {
      fetch("/api/check_session").then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => login(user));
        }
      });
    }, []);
}

export default CheckSession
