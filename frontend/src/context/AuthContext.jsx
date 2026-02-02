import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/auth/refresh", {
                    withCredentials: true
                })
                setAuth({accessToken: res.data.accessToken, role: res.data.user.role, email: res.data.user.email});
            }
            catch (error) {
                setAuth(null);
            }
            finally {
                setloading(false);
            }
        }
        checkAuth();
    }, [])

    return (
    <AuthContext.Provider value = {{auth, setAuth, loading}}>
        {children}
    </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);