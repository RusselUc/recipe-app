import { createContext, useEffect, useState } from "react"
import { setAuthToken } from "../api/axiosInstance";

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        setAuthToken(token); // Configuramos el token en axiosInstance
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider