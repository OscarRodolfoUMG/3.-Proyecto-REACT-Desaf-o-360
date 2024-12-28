import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Producto = sequelize.define(
    'Producto',
    {
        id_codigo_producto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        stock: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        foto: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fk_id_categoriaProductos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'CategoriaProducto',
                key: 'id_categoriaProductos',
            },
        },
        fk_id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario',
                key: 'id_usuario',
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
        tableName: 'Productos',
        timestamps: false,
    }
);


export default Producto;