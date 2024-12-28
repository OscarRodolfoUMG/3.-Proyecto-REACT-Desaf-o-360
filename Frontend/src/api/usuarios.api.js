import axios from "./axios.js";

//Peticiones al Backend

export const getAllUsersRequest = () => axios.get('/users');
export const getUserRequest = (id) => axios.get(`/users/${id}`);
export const createUserRequest = (user) => axios.post('/users', user);
export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user);

export const inactivateUserRequest = (id) => axios.patch(`/users/inactivate/${id}`);
export const activateUserRequest = (id) => axios.patch(`/users/activate/${id}`);


