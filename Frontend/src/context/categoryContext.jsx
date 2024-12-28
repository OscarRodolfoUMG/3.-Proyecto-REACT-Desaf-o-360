import { createContext, useContext, useState } from "react";
import { getAllCategoriesRequest,  getCategoryRequest, updateCategoryRequest, activateCategoryRequest, inactivateCategoryRequest, createCategoryRequest } from "../api/categoria.api";

//Contexto para los registros de Usuarios
const CategoryContext = createContext();

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategories debe usarse dentro de un CategoryProvider');
    }
    return context;
}

export function CategoryProvider({ children }) {

    const [categories, setCategories] = useState([]);

    //Obtiene los datos de los usuarios
    const getAllCategories = async () => {
        try {
            const res = await getAllCategoriesRequest();
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para obtener informacion de un usuario
    const getCategory = async (id) => {
        try {
            const res = await getCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para crear un usuario
    const createCategory = async (user) => {
        try {
            const res = await createCategoryRequest(user);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }

    };

    //Solicitud para actualizar el registro de un usuario
    const updateCategory = async (id, user) => {
        try {
            const res = await updateCategoryRequest(id, user)
            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    //Solicitud para innactivar usuario
    const activateCategoryById = async (id) => {
        try {
            const res = activateCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    //Solicitud para innactivar usuario
    const inactivateCategoryById = async (id) => {
        try {
            const res = inactivateCategoryRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <CategoryContext.Provider
            value={{
                categories,
                setCategories,
                createCategory,
                getAllCategories,
                getCategory,
                updateCategory,
                activateCategoryById,
                inactivateCategoryById
            }}>
            {children}
        </CategoryContext.Provider>
    )
}