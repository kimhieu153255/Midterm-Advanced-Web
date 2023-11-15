import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

function AuthProvider(props) {
    const [cookies] = useCookies(['token']);
    const [user, setUser] = useState();
    const [token, setToken] = useState(cookies);

    const value = {
        user,
        setUser,
        token,
        setToken,
    };
    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
