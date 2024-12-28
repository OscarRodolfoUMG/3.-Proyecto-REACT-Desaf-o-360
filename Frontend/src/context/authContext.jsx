import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, logoutRequest, verifyTokenRequest } from '../api/auth.api.js';
import Cookies from "js-cookie";

//Contexto para las Autorizaciones del Login
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    //Realiza la peticion de inicio de sesion
    const login = async (user) => {
        try {
            setLoading(true);
            const res = await loginRequest(user);
            setIsAuthenticated(true);
            console.log("DATA: ", res.data);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        } finally {
            setLoading(false);
        }
    };
    //Cierra la sesion
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 10000);
            return () => clearTimeout(timer)
        }
    }, [errors])

    //Verifica si esta activo un token de inicio de sesion
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            } finally {
                setLoading(false);
            }

        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            loading,

            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}