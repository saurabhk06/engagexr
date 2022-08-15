/**
 * This file is used for Server configuration which includes initializing middlewares, initializing routes
 * and out server related configuration.
 */
import express, { Express, Router } from 'express';
import * as ServerConfig from '../configs/ServerConfig.json';
import { InitializeSequelize } from './InitializeSequelize';
import { InitializeMiddleware } from './InitializeMiddleware';
import { InitializeRoutes } from './InitializeRoutes';

//TODO: import port from .env file(configure for prod, staging & local)
export async function server() {
  const app: Express = express();
  const router: Router = express.Router();

  const host: string = ServerConfig.host;
  const port: number = ServerConfig.port;

  //Initialize common & built in middlewares
  await InitializeMiddleware.InitializeCommonMiddleware(app);

  //Initialize routes
  await InitializeRoutes.registerAllRoutes(app, router);

  //Initialize typescript-sequelize and establish connection with DB.
  await InitializeSequelize.connect();

  // Initialize error handling middleware
  await InitializeMiddleware.InitializeErrorHandlingMiddleware(app);

  app.listen(port, host, () => {
    console.log(`Server is listening at port ${port}`);
  });
}
