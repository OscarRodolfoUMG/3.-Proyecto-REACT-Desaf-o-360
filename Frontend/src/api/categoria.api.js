import axios from "./axios.js";

//Peticiones al Backend

export const getAllCategoriesRequest = () => axios.get('/categoriaProductos');
export const getCategoryRequest = (id) => axios.get(`/categoriaProductos/${id}`);
export const createCategoryRequest = (category) => axios.post('/categoriaProductos', category);
export const updateCategoryRequest = (id, category) => axios.put(`/categoriaProductos/${id}`, category);

export const inactivateCategoryRequest = (id) => axios.patch(`/categoriaProductos/inactivate/${id}`);
export const activateCategoryRequest = (id) => axios.patch(`/categoriaProductos/activate/${id}`);


