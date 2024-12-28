import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Estado = sequelize.define(
    'Estado',
    {
        id_estados: {
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
        tableName: 'Estados',
        timestamps: false,
    }
);


export default Estado;
