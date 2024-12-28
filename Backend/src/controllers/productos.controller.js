import Producto from '../models/productos.model.js';
import sequelize from '../db.js';

export const getAllProducts = async (req, res) => {
    try {
        const products = await sequelize.query('EXEC proc_productos_selectAll', {
            model: Producto,
            mapToModel: true
        })
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener productos ', error: error });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await sequelize.query('EXEC proc_productos_selectById :id_cod_producto', {
            replacements: {
                id_cod_producto: id,
            },
            model: Producto,
            mapToModel: true,
        })
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener producto', error: error });
    }
};


export const createProduct = async (req, res) => {
    const { nombre, marca, precio, stock, foto, fk_id_categoriaProducto, fk_id_usuario, fk_id_estado } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_productos_insert 
          :nombre, 
          :marca, 
          :precio, 
          :stock, 
          :foto, 
          :fk_id_categoriaProducto,
          :fk_id_usuario,
          :fk_id_estado`,
            {
                replacements: {
                    nombre,
                    marca,
                    precio,
                    stock,
                    foto,
                    fk_id_categoriaProducto,
                    fk_id_usuario,
                    fk_id_estado,
                },
            }
        );
        res.status(201).json({ message: "Producto agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar producto", error: error });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        marca,
        precio,
        stock,
        foto,
        fk_id_categoriaProductos,
        fk_id_usuario,
        fk_id_estados,
    } = req.body;
    
    try {
        await sequelize.query(
            `EXEC proc_productos_update
            :id_codigo_producto, 
            :nombre,
            :marca,
            :precio,
            :stock,
            :foto,
            :fk_id_categoriaProductos,
            :fk_id_usuario,
            :fk_id_estados`,
            {
                replacements: {
                    id_codigo_producto: id,
                    nombre,
                    marca,
                    precio,
                    stock,
                    foto,
                    fk_id_categoriaProductos,
                    fk_id_usuario,
                    fk_id_estados,
                },
            }
        );
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        console.log("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario", error: error.message });
    }
};

export const inactivateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_productos_inactivate :id_codigo_producto`,
            {
                replacements: {
                    id_codigo_producto: id,
                },
            }
        );
        res.status(201).json({ message: "Producto inactivado correctamente" });
    } catch (error) {
        console.log(error);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro el producto" });
        } else {
            res.status(500).json({ message: "Error al inactivar producto", error: error });
        }
    }
};

export const activateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_productos_activate :id_codigo_producto`,
            {
                replacements: {
                    id_codigo_producto: id,
                },
            }
        );
        res.status(201).json({ message: "Producto activado correctamente" });
    } catch (error) {
        console.log(error);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro el Producto" });
        } else {
            res.status(500).json({ message: "Error al activar producto", error: error });
        }
    }
};


