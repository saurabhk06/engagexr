import { Express, Router } from 'express';
import { ApplicationConstants } from '../constants/ApplicationConstants';
import {
  createCompany,
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
} from '../controllers/CompanyController';
import { isAdmin } from '../middleware/CheckAdminMiddleware';
import { validateToken } from '../middleware/ValidateTokenMiddlware';
import { AbstractBaseRoute } from './AbstractBaseRoute';

export class CompanyRoutes extends AbstractBaseRoute {
  constructor(_app: Express, _router: Router) {
    super(_app, _router);
  }

  public async routes() {
    await this.urlpaths();
    this.app.use(ApplicationConstants.BASE_API_PATH, this.router);
  }

  public async urlpaths() {
    this.router.post('/create-company', validateToken, isAdmin, createCompany);
    this.router.get('/companies', validateToken, getAllCompanies);
    this.router.get('/company/:companyId', validateToken, getCompanyById);
    this.router.patch(
      '/company/:companyId',
      validateToken,
      isAdmin,
      updateCompanyById
    );
    this.router.delete(
      '/company/:companyId',
      validateToken,
      isAdmin,
      deleteCompanyById
    );
  }
}

// create route: requires ADMIN priveleges
// router.post('/create-company', [
//     check('name', 'name cannot be empty.').not().isEmpty(),
//     body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
// ], validateToken, isAdmin, companyController.createCompany);

// read route: Public APIs
// router.get('/companies', companyController.getAllCompanies);

// router.get('/company/:id', [
//     param('id', 'CompanyId is not valid').exists().isInt()
// ], companyController.getCompanyById);

// router.get('/company/:companyId/employees', [
//     param('companyId', 'CompanyId is not valid').exists().isInt()
// ], companyController.getEmployeeByCompanyId);

// // update route: requires ADMIN priveleges
// router.patch('/company/:id', [
//     param('id', 'CompanyId is not valid').exists().isInt()
// ], validateToken, isAdmin, companyController.updateCompany);

// // delete route: requires ADMIN priveleges
// router.delete('/company/:id',[
//     param('id', 'CompanyId is not valid').exists().isInt()
// ], validateToken, isAdmin, companyController.deleteCompanyById);
