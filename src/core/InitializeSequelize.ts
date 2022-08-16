import { sequelize } from '../configs/sequelizeconfig';
import { logger } from '../utils/logger';

/**
 * This class is used to initialize the sequelize connection.
 */
export class InitializeSequelize {
  public static async connect() {
    try {
      await sequelize.authenticate();
      logger.info('Database Connection has been established successfully.');

      await sequelize.sync({ force: true });
      // await sequelize.sync();
    } catch (error: any) {
      logger.error('Unable to connect to the database:', error);
    }
  }
}
