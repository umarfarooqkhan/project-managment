import { Sequelize } from 'sequelize';
import * as config from '../../db/config/config.json';

const env = process.env.NODE_ENV || 'development';
const dbConfig = (config as any)[env];

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as any,
    dialectOptions: dbConfig.dialectOptions,
  }
);
