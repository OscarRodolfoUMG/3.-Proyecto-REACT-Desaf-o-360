import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Rol = sequelize.define(
    'Rol',
    {
        id_rol: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    },
    {
        tableName: 'Rol',
        timestamps: false,
    }
);


export default Rol;
