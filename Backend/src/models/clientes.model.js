import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Cliente = sequelize.define(
    'Cliente',
    {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre_comercial: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        razon_social: {
            type: DataTypes.STRING(245),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        fk_id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Usuario',
                key: 'id_usuario',
            },
        },
    },
    {
        tableName: 'Clientes',
        timestamps: false,
    }
);

export default Cliente;