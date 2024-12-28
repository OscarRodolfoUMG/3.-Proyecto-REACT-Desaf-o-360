import axios from "./axios.js";

//Peticiones al Backend

export const getAllProductsRequest = () => axios.get('/productos');
export const getProductRequest = (id) => axios.get(`/productos/${id}`);
export const createProductRequest = (product) => axios.post('/productos', product);
export const updateProductRequest = (id, product) => axios.put(`/productos/${id}`, product);

export const inactivateProductRequest = (id) => axios.patch(`/productos/inactivate/${id}`);
export const activateProductRequest = (id) => axios.patch(`/productos/activate/${id}`);


