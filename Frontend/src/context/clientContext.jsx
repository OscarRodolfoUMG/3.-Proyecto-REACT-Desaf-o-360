import { createContext, useContext, useState } from "react";
import { getAllClientsRequest, getClientRequest, createClientRequest, updateClientRequest, getAllClientsUserRequest } from "../api/clientes.api.js";

//Contexto para los registros de Usuarios
const ClientContext = createContext();

export const useClients = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error('useClients debe usarse dentro de un ClientProvider');
    }
    return context;
}

export function ClientProvider({ children }) {

    const [clients, setClients] = useState([]);

    //Obtiene los datos de los clientes
    const getAllClients = async () => {
        try {
            const res = await getAllClientsRequest();
            setClients(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Obtiene los datos de los usuarios de clientes
    const getAllClientsUser = async () => {
        try {
            const res = await getAllClientsUserRequest();
            setClients(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para obtener informacion de un usuario
    const getClient = async (id) => {
        try {
            const res = await getClientRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para crear un usuario
    const createClient = async (client) => {
        try {
            const res = await createClientRequest(client);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }

    };

    //Solicitud para actualizar el registro de un usuario
    const updateClient = async (id, client) => {
        try {
            const res = await updateClientRequest(id, client)
            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    return (
        <ClientContext.Provider
            value={{
                clients,
                setClients,
                getAllClients,
                getAllClientsUser,
                getClient,
                createClient,
                updateClient
            }}>
            {children}
        </ClientContext.Provider>
    )
}