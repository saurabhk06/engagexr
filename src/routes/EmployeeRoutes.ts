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
import { validateToken } from '../middleware/ValidateTokenMiddlware';
import { logger } from '../utils/logger';
import { AbstractBaseRoute } from './AbstractBaseRoute';

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
      createEmployee
    );
    this.router.get('/employees', validateToken, getAllEmployees);
    this.router.get('/employee/:employeeId', validateToken, getEmployeeById);
    this.router.get(
      '/company/:companyId/employees',
      validateToken,
      getEmployeeByCompanyId
    );
    this.router.patch(
      '/employee/:employeeId',
      validateToken,
      isAdmin,
      updateEmployeeById
    );
    this.router.delete(
      '/employee/:employeeId',
      validateToken,
      isAdmin,
      deleteEmployeeById
    );
  }
}

// // create route: requires ADMIN priveleges
// router.post('/create-employee', [
//     check('companyId', 'CompanyId cannot be empty.').not().isEmpty(),
//     check('companyId', 'CompanyId must be an Integer.').isInt(),
//     check('firstName', 'firstName cannot be empty.').not().isEmpty(),
//     check('lastName', 'lastName cannot be empty.').not().isEmpty(),
//     body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
// ], validateToken, isAdmin, employeeController.createEmployee);

// // read route: Public APIs
// router.get('/employees', employeeController.getAllEmployees);

// router.get('/employee/:id', [
//     param('id', 'EmployeeId is not valid').exists().isInt()
// ],employeeController.getEmployeeById);

// // update route: requires ADMIN priveleges
// router.patch('/employee/:id', [
//     param('id', 'EmployeeId is not valid').exists().isInt()
// ], validateToken, isAdmin, employeeController.updateEmployee);

// // delete route: requires ADMIN priveleges
// router.delete('/employee/:id', [
//     param('id', 'EmployeeId is not valid').exists().isInt()
// ], validateToken, isAdmin, employeeController.deleteEmployeeById);
