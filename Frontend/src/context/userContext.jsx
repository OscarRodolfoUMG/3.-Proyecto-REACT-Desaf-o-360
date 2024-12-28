import { createContext, useContext, useState } from "react";
import { getAllUsersRequest,  getUserRequest, updateUserRequest, activateUserRequest, inactivateUserRequest, createUserRequest } from "../api/usuarios.api.js";

//Contexto para los registros de Usuarios
const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers debe usarse dentro de un UserProvider');
    }
    return context;
}

export function UserProvider({ children }) {

    const [users, setUsers] = useState([]);

    //Obtiene los datos de los usuarios
    const getAllUsers = async () => {
        try {
            const res = await getAllUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para obtener informacion de un usuario
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para crear un usuario
    const createUser = async (user) => {
        try {
            const res = await createUserRequest(user);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }

    };

    //Solicitud para actualizar el registro de un usuario
    const updateUser = async (id, user) => {
        try {
            const res = await updateUserRequest(id, user)
            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    //Solicitud para innactivar usuario
    const activateUserById = async (id) => {
        try {
            const res = activateUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    //Solicitud para innactivar usuario
    const inactivateUserById = async (id) => {
        try {
            const res = inactivateUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <UserContext.Provider
            value={{
                users,
                setUsers,
                createUser,
                getAllUsers,
                getUser,
                updateUser,
                activateUserById,
                inactivateUserById
            }}>
            {children}
        </UserContext.Provider>
    )
}