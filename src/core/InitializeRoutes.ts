import { Express, Router } from 'express';
import { CompanyRoutes } from '../routes/CompanyRoutes';
import { EmployeeRoutes } from '../routes/EmployeeRoutes';
import { UserRoutes } from '../routes/UserRoutes';

export class InitializeRoutes {
  public static async registerAllRoutes(app: Express, router: Router) {
    const userRoutes = new UserRoutes(app, router);
    await userRoutes.routes();

    const companyRoutes = new CompanyRoutes(app, router);
    await companyRoutes.routes();

    const employeeRoutes = new EmployeeRoutes(app, router);
    await employeeRoutes.routes();
  }
}
