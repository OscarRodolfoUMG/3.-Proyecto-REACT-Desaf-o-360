import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const OrdenDetalle = sequelize.define(
    'OrdenDetalle',
    {
        fk_id_orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Orden',
                key: 'id_orden',
            },
        },
        fk_id_codigo_producto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Producto',
                key: 'id_codigo_producto',
            },
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'OrdenDetalles',
        timestamps: false,
    }
);

export default OrdenDetalle;