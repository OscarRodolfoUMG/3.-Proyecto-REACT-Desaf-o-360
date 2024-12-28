import Clientes from '../models/clientes.model.js';
import sequelize from '../db.js';

export const getAllClientes = async (req, res) => {
    try {
        const clientes = await sequelize.query('EXEC proc_clientes_selectAll', {
            model: Clientes,
            mapToModel: true
        })
        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener clientes ', error: error });
    }
};
export const getAllUsuarioClientes= async (req, res) => {
    try {
        const clientes = await sequelize.query('EXEC proc_clientes_selectUsuarioClientes', {
            model: Clientes,
            mapToModel: true
        })
        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener clientes ', error: error });
    }
};


export const getClienteById = async (req, res) => {
    try {
        const { id } = req.params;
        const clientes = await sequelize.query('EXEC proc_clientes_selectById :id_cliente', {
            replacements: {
                id_cliente: id,
            },
            model: Clientes,
            mapToModel: true,
        })
        res.status(200).json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener clientes', error: error });
    }
};

export const createCliente = async (req, res) => {
    const { nombre_comercial, razon_social, direccion, fk_id_usuario } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_clientes_insert
          :nombre_comercial, 
          :razon_social, 
          :direccion, 
          :fk_id_usuario`,
            {
                replacements: {
                    nombre_comercial,
                    razon_social,
                    direccion,
                    fk_id_usuario,
                },
            }
        );
        res.status(201).json({ message: "Cliente agregado correctamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al agregar Cliente", error: err });
    }
};

export const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre_comercial, razon_social, direccion, fk_id_usuario } = req.body;
    try {
        await sequelize.query(
            `EXEC proc_clientes_update
            :id_cliente,
            :nombre_comercial, 
            :razon_social, 
            :direccion, 
            :fk_id_usuario`,
            {
                replacements: {
                    id_cliente: id,
                    nombre_comercial,
                    razon_social,
                    direccion,
                    fk_id_usuario,
                },
            }
        );
        res.status(201).json({ message: "Cliente actualizado correctamente" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al actualizar Cliente", error: err });
    }
};
