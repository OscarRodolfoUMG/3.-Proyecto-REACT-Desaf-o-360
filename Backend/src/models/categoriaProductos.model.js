import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const CategoriaProducto = sequelize.define(
    'CategoriaProducto',
    {
        id_categoriaProductos: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
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
        tableName: 'CategoriaProductos',
        timestamps: false,
    }
);

export default CategoriaProducto;