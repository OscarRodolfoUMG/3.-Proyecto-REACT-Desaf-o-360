
import { Sequelize } from '@sequelize/core';
import { MsSqlDialect } from '@sequelize/mssql';

const sequelize = new Sequelize({
  dialect: MsSqlDialect,
  server: 'localhost',
  port: 1433,
  database: 'GDA0050-OT-OscarChavez',
  authentication: {
    type: 'default',
    options: {
      userName: 'sa',
      password: 'password',
    },
  },
  trustServerCertificate: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;