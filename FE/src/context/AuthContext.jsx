import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

const AuthContext = createContext();

function AuthProvider(props) {
    const [user, setUser] = useState();

    const value = {
        user,
        setUser,
    };
    return <AuthContext.Provider value={value} {...props} />;
}

export { AuthProvider, AuthContext };
