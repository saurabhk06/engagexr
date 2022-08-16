import { Express } from 'express';
import { CommonMiddleware } from '../middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '../middleware/ErrorHandlingMiddleware';
import { logger } from '../utils/logger';

export class InitializeMiddleware {
  public static async InitializeCommonMiddleware(app: Express) {
    logger.info('Started initializing common middleware');

    const middleware = new CommonMiddleware(app);

    await middleware.useURLencoded();
    await middleware.useJsonParser();
    await middleware.useCors();

    logger.info('Completed initializing common middleware');
  }

  public static async InitializeErrorHandlingMiddleware(app: Express) {
    logger.info('Started initializing error handling middleware');

    const errorMiddleware = new ErrorHandlingMiddleware(app);

    await errorMiddleware.handle404Error();
    await errorMiddleware.registerTokenErrorHandler();

    logger.info('Completed initializing error handling middleware');
  }
}
