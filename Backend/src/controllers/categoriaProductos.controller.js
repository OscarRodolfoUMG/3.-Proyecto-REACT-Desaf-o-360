import CategoriaProductos from '../models/categoriaProductos.model.js';
import sequelize from '../db.js';

export const getAllCategoriaProductos = async (req, res) => {
    try {
        const categoriaProductos = await sequelize.query('EXEC proc_categoriaProductos_selectAll', {
            model: CategoriaProductos,
            mapToModel: true
        })
        res.status(200).json(categoriaProductos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener categoriaProductos', error: error });
    }
};

export const getCategoriaProductosById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaProductos = await sequelize.query('EXEC proc_categoriaProductos_selectById :id_categoriaProductos', {
            replacements: {
                id_categoriaProductos: id,
            },
            model: CategoriaProductos,
            mapToModel: true,
        })
        res.status(200).json(categoriaProductos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener categoriaProductos', error: error });
    }
};


export const createCategoriaProducto = async (req, res) => {
    const { nombre, fk_id_estados } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_categoriaProductos_insert
          :nombre, 
          :fk_id_estados`,
            {
                replacements: {
                    nombre,
                    fk_id_estados,
                },
            }
        );
        res.status(201).json({ message: "CategoriaProducto agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar categoriaProductos", error: error });
    }
};

export const updateCategoriaProducto = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
        fk_id_estados,
    } = req.body;

    try {
        await sequelize.query(
            `EXEC proc_categoriaProductos_update
            :id_categoriaProductos, 
            :nombre,
            :fk_id_estados`,
            {
                replacements: {
                    id_categoriaProductos: id,
                    nombre,
                    fk_id_estados,
                },
            }
        );
        res.status(200).json({ message: "CategoriaProductos actualizado correctamente " });
    } catch (error) {
        console.log("Error al actualizar CategoriaProductos: ", error);
        res.status(500).json({ message: "Error al actualizar CategoriaProductos ", error: error.message });
    }
};


export const inactivateCategoriaProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_categoriaProductos_inactivate :id_categoriaProductos`,
            {
                replacements: {
                    id_categoriaProductos: id,
                },
            }
        );
        res.status(201).json({ message: "CategoriaProducto inactivado correctamente" });
    } catch (err) {
        console.log(err);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro CategoriaProducto" });
        } else {
            res.status(500).json({ message: "Error al inactivar CategoriaProducto", error: err });
        }
    }
};

export const activateCategoriaProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await sequelize.query(
            `EXEC proc_categoriaProductos_activate :id_categoriaProductos`,
            {
                replacements: {
                    id_categoriaProductos: id,
                },
            }
        );
        res.status(201).json({ message: "CategoriaProducto activada correctamente" });
    } catch (err) {
        console.log(err);
        if (AggregateError) {
            res.status(500).json({ message: "No se encontro CategoriaProducto" });
        } else {
            res.status(500).json({ message: "Error al activar CategoriaProducto", error: err });
        }
    }
};


