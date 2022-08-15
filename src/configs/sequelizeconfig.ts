import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  database: 'engagexrtestdb',
  dialect: 'mysql',
  username: 'root',
  password: 'damco06',
  storage: ':memory:',
  models: [__dirname + '/../models'], // or [Player, Team],
});
