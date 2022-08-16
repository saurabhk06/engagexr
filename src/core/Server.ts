/**
 * This file is used for Server configuration which includes initializing middlewares, initializing routes
 * and other server related configuration.
 */
import express, { Express, Router } from 'express';
import { InitializeSequelize } from './InitializeSequelize';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';
import { logger } from '../utils/logger';
import { local } from '../configs/ServerConfig';

export async function server() {
  const app: Express = express();
  const router: Router = express.Router();

  const host: string = local.host;
  const port: number = local.port;

  //Initialize common & built in middlewares
  await InitializeMiddleware.InitializeCommonMiddleware(app);

  //Initialize routes
  await InitializeRoutes.registerAllRoutes(app, router);

  //Initialize typescript-sequelize and establish connection with DB.
  await InitializeSequelize.connect();

  // Initialize error handling middleware
  await InitializeMiddleware.InitializeErrorHandlingMiddleware(app);

  app.listen(port, host, () => {
    logger.log('info', `Server is listening at port ${port}`);
  });
}
