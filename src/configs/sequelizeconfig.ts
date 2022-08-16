import { Sequelize } from 'sequelize-typescript';

/**
 * This method generates the sequelize instance to use.
 */
export const sequelize = new Sequelize({
  database: 'YOUR_DATABASE_NAME',
  dialect: 'mysql',
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  storage: ':memory:',
  models: [__dirname + '/../models'],
});
