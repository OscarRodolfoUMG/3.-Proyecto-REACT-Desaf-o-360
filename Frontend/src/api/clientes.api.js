import axios from "./axios.js";

//Peticiones al Backend

export const getAllClientsRequest = () => axios.get('/clientes');
export const getAllClientsUserRequest = () => axios.get('/usuarioClientes');
export const getClientRequest = (id) => axios.get(`/clientes/${id}`);
export const createClientRequest = (client) => axios.post('/clientes', client);
export const updateClientRequest = (id, client) => axios.put(`/clientes/${id}`, client);


