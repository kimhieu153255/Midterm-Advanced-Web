import { createContext, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();
function AuthProvider(props) {
  const [user, setUser] = useState();
  const [token, setToken] = useState(Cookies.get("token"));

  const value = {
    user,
    setUser,
    token,
    setToken,
  };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
