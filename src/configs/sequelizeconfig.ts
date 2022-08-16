import { Sequelize } from 'sequelize-typescript';

/**
 * This method generates the sequelize instance to use.
 */
export const sequelize = new Sequelize({
  database: 'engagexrtestdb',
  dialect: 'mysql',
  username: 'root',
  password: 'damco06',
  storage: ':memory:',
  models: [__dirname + '/../models'],
});
