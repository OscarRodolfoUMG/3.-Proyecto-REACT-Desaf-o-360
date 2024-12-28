import Estados from '../models/estados.model.js';
import sequelize from '../db.js';

export const getAllEstados = async (req, res) => {
    try {
        const estados = await sequelize.query('EXEC proc_estados_selectAll', {
            model: Estados,
            mapToModel: true
        })
        res.status(200).json(estados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener estados ', error: error });
    }
};

export const getEstadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const estados = await sequelize.query('EXEC proc_estados_selectById :id_estados', {
            replacements: {
                id_estados: id,
            },
            model: Estados,
            mapToModel: true,
        })
        res.status(200).json(estados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener estado', error: error });
    }
};

export const createEstados = async (req, res) => {
    const { nombre } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_estados_insert
          :nombre`,
            {
                replacements: {
                    nombre,
                },
            }
        );
        res.status(201).json({ message: "Estados agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar estados", error: error });
    }
};

export const updateEstado = async (req, res) => {
    const { id } = req.params;
    const {
        nombre,
    } = req.body;

    try {
        await sequelize.query(
            `EXEC proc_estados_update
            :id_estados, 
            :nombre`,
            {
                replacements: {
                    id_estados: id,
                    nombre,
                },
            }
        );
        res.status(200).json({ message: "CategoriaProductos actualizado correctamente " });
    } catch (error) {
        console.log("Error al actualizar CategoriaProductos: ", error);
        res.status(500).json({ message: "Error al actualizar CategoriaProductos ", error: error.message });
    }
};

