import { DataTypes } from '@sequelize/core';
import sequelize from '../db.js';

const Usuario = sequelize.define(
  'Usuario',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo_electronico: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    nombre_completo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(8),
      allowNull: true,
      validate: {
        len: [8, 8],
        isNumeric: true,
      },
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fk_id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rol',
        key: 'id_rol',
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
    tableName: 'Usuarios',
    timestamps: false,
  }
);


export default Usuario;
