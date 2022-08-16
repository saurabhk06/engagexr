import { Express, Router } from 'express';
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  getEmployeeByCompanyId,
  getEmployeeById,
  updateEmployeeById,
} from '../controllers/EmployeeController';
import { isAdmin } from '../middleware/CheckAdminMiddleware';
import { validatePayload } from '../middleware/PayloadValidationMiddleware';
import { validateToken } from '../middleware/ValidateTokenMiddlware';
import { logger } from '../utils/logger';
import {
  companyIdSanitize,
  createEmployeeSanitize,
  employeeIdSanitize,
} from '../utils/payloadSanitization';
import { AbstractBaseRoute } from './AbstractBaseRoute';

/**
 * This class register all the Employee routes.
 */
export class EmployeeRoutes extends AbstractBaseRoute {
  constructor(_app: Express, _router: Router) {
    super(_app, _router);
  }

  public async routes() {
    logger.info('Registering user routes');

    await this.urlpaths();
    this.app.use(this.router);
  }

  public async urlpaths() {
    this.router.post(
      '/create-employee',
      validateToken,
      isAdmin,
      createEmployeeSanitize,
      validatePayload,
      createEmployee
    );
    this.router.get('/employees', validateToken, getAllEmployees);
    this.router.get(
      '/employee/:employeeId',
      validateToken,
      employeeIdSanitize,
      validatePayload,
      getEmployeeById
    );
    this.router.get(
      '/company/:companyId/employees',
      validateToken,
      companyIdSanitize,
      validatePayload,
      getEmployeeByCompanyId
    );
    this.router.patch(
      '/employee/:employeeId',
      validateToken,
      isAdmin,
      employeeIdSanitize,
      validatePayload,
      updateEmployeeById
    );
    this.router.delete(
      '/employee/:employeeId',
      validateToken,
      isAdmin,
      employeeIdSanitize,
      validatePayload,
      deleteEmployeeById
    );
  }
}
