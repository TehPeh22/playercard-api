import { createContext, useState, useContext, Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('isAuthenticated') === 'true'
    )

    const login = () => {
        localStorage.setItem('isAuthenticated', 'true')
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.setItem('isAuthenticated', 'false')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)