import { createContext, useContext, useState } from "react";
import { getAllProductsRequest,  getProductRequest, updateProductRequest, activateProductRequest, inactivateProductRequest, createProductRequest } from "../api/producto.api.js";

//Contexto para los registros de Usuarios
const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts debe usarse dentro de un ProductProvider');
    }
    return context;
}

export function ProductProvider({ children }) {

    const [products, setProducts] = useState([]);

    //Obtiene los datos de los usuarios
    const getAllProducts = async () => {
        try {
            const res = await getAllProductsRequest();
            setProducts(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para obtener informacion de un usuario
    const getProduct = async (id) => {
        try {
            const res = await getProductRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para crear un usuario
    const createProduct = async (user) => {
        try {
            const res = await createProductRequest(user);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }

    };

    //Solicitud para actualizar el registro de un usuario
    const updateProduct = async (id, user) => {
        try {
            const res = await updateProductRequest(id, user)
            return res;
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    //Solicitud para innactivar usuario
    const activateProductById = async (id) => {
        try {
            const res = activateProductRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    //Solicitud para innactivar usuario
    const inactivateProductById = async (id) => {
        try {
            const res = inactivateProductRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setProducts,
                createProduct,
                getAllProducts,
                getProduct,
                updateProduct,
                activateProductById,
                inactivateProductById
            }}>
            {children}
        </ProductContext.Provider>
    )
}