import OrdenDetalle from '../models/ordenDetalle.model.js';
import sequelize from '../db.js';

export const getAllOrdenDetalle = async (req, res) => {
    try {
        const ordenDetalle = await sequelize.query('EXEC proc_ordenDetalles_selectAll', {
            model: OrdenDetalle,
            mapToModel: true
        })
        res.status(200).json(ordenDetalle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener ordenDetalles ', error: error });
    }
};

export const getOrdenDetalleById = async (req, res) => {
    try {
        const { id_orden, id_cod } = req.params;
        const ordenDetalle = await sequelize.query('EXEC proc_ordenDetalles_selectById :fk_id_orden, :fk_id_codigo_producto', {
            replacements: {
                fk_id_orden: id_orden,
                fk_id_codigo_producto: id_cod
            },
            model: OrdenDetalle,
            mapToModel: true,
        })
        res.status(200).json(ordenDetalle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener ordenDetalle', error: error });
    }
};

export const createOrdenDetalle = async (req, res) => {
    const { fk_id_orden, fk_id_codigo_producto, cantidad, precio, subtotal } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_ordenDetalles_insert
                :fk_id_orden, 
                :fk_id_codigo_producto, 
                :cantidad, 
                :precio, 
                :subtotal`,
            {
                replacements: {
                    fk_id_orden,
                    fk_id_codigo_producto,
                    cantidad,
                    precio,
                    subtotal,
                },
            }
        );
        res.status(201).json({ message: "OrdenDetalle agregado correctamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al agregar OrdenDetalle", error: err });
    }
};

export const updateOrdenDetalle = async (req, res) => {
    const { id_orden, id_cod } = req.params;
    const { cantidad, precio, subtotal } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_ordenDetalles_update
                :fk_id_orden, 
                :fk_id_codigo_producto, 
                :cantidad, 
                :precio, 
                :subtotal`,
            {
                replacements: {
                    fk_id_orden: id_orden,
                    fk_id_codigo_producto: id_cod,
                    cantidad,
                    precio,
                    subtotal,
                },
            }
        );
        res.status(201).json({ message: "OrdenDetalle actualizado correctamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al actualizar OrdenDetalle", error: err });
    }
};