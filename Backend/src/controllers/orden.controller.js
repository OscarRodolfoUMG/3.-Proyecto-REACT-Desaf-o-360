import Orden from '../models/orden.model.js';
import sequelize from '../db.js';

export const getAllOrden = async (req, res) => {
    try {
        const ordenes = await sequelize.query('EXEC proc_orden_selectAll', {
            model: Orden,
            mapToModel: true
        })
        res.status(200).json(ordenes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener Ordenes ', error: error });
    }
};

export const getOrdenById = async (req, res) => {
    try {
        const { id } = req.params;
        const orden = await sequelize.query('EXEC proc_orden_selectById :id_orden', {
            replacements: {
                id_orden: id,
            },
            model: Orden,
            mapToModel: true,
        })
        res.status(200).json(orden);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener producto', error: error });
    }
};

export const createOrden = async (req, res) => {
    const { direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_orden_insert 
            :direccion_entrega,
            :telefono,
            :fecha_entrega,
            :total_orden,
            :fk_id_cliente,
            :fk_id_estados`,
            {
                replacements: {
                    direccion_entrega,
                    telefono,
                    fecha_entrega,
                    total_orden,
                    fk_id_cliente,
                    fk_id_estados,
                },
            }
        );
        res.status(201).json({ message: "Orden agregado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar Orden", error: error });
    }
};

export const updateOrden = async (req, res) => {
    const { id } = req.params;
    const { direccion_entrega, telefono, fecha_entrega, total_orden, fk_id_cliente, fk_id_estados } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_orden_update
            :id_orden,
            :direccion_entrega,
            :telefono,
            :fecha_entrega,
            :total_orden,
            :fk_id_cliente,
            :fk_id_estados`,
            {
                replacements: {
                    id_orden: id,
                    direccion_entrega,
                    telefono,
                    fecha_entrega,
                    total_orden,
                    fk_id_cliente,
                    fk_id_estados,
                },
            }
        );
        res.status(201).json({ message: "Orden actualizado correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar Orden", error: error });
    }
};

export const createOrden_detalles = async (req, res) => {
    const {
        direccion_entrega,
        telefono,
        fecha_entrega,
        total_orden,
        fk_id_cliente,
        fk_id_estados,
        detalles,
    } = req.body;

    try {
        await sequelize.query(
            `EXEC proc_orden_insert_con_detalles
            :direccion_entrega,
            :telefono,
            :fecha_entrega,
            :total_orden,
            :fk_id_cliente,
            :fk_id_estados,
            :detalles`,
            {
                replacements: {
                    direccion_entrega,
                    telefono,
                    fecha_entrega,
                    total_orden,
                    fk_id_cliente,
                    fk_id_estados,
                    detalles: JSON.stringify(detalles), // Convierte los detalles a JSON
                },
            }
        );
        res.status(201).json({ message: "Orden y detalles agregados correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar orden con detalles", error });
    }
};
