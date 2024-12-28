import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Orden = sequelize.define(
    'Orden',
    {
        id_orden: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        direccion_entrega: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(8),
            allowNull: true,
        },
        fecha_entrega: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        total_orden: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fk_id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Cliente',
                key: 'id_cliente',
            },
        },
        fk_id_estados: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Estado',
                key: 'id_estados',
            },
        },
    },
    {
        tableName: 'Orden',
        timestamps: false,
    }
);

export default Orden;