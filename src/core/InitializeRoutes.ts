import { Express, Router } from 'express';
import { CompanyRoutes } from '../routes/CompanyRoutes';
import { EmployeeRoutes } from '../routes/EmployeeRoutes';
import { UserRoutes } from '../routes/UserRoutes';
import { logger } from '../utils/logger';

/**
 * This class is used to initialize all the routes.
 */
export class InitializeRoutes {
  public static async registerAllRoutes(app: Express, router: Router) {
    logger.info('Started registering routes');

    const userRoutes = new UserRoutes(app, router);
    await userRoutes.routes();

    const companyRoutes = new CompanyRoutes(app, router);
    await companyRoutes.routes();

    const employeeRoutes = new EmployeeRoutes(app, router);
    await employeeRoutes.routes();

    logger.info('Completed registering routes');
  }
}
