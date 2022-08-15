import { sequelize } from '../configs/sequelizeconfig';

export class InitializeSequelize {
  public static async connect() {
    try {
      await sequelize.authenticate();
      console.log('Database Connection has been established successfully.');

      // await sequelize.sync({force: true})
      await sequelize.sync();
    } catch (error: any) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
