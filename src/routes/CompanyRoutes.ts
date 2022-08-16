import { Express, Router } from 'express';
import { check } from 'express-validator';
import { ApplicationConstants } from '../constants/ApplicationConstants';
import {
  createCompany,
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
} from '../controllers/CompanyController';
import { isAdmin } from '../middleware/CheckAdminMiddleware';
import { validatePayload } from '../middleware/PayloadValidationMiddleware';
import { validateToken } from '../middleware/ValidateTokenMiddlware';
import { logger } from '../utils/logger';
import {
  companyIdSanitize,
  createCompanySanitize,
} from '../utils/payloadSanitization';
import { AbstractBaseRoute } from './AbstractBaseRoute';

/**
 * This class register all the Company routes.
 */
export class CompanyRoutes extends AbstractBaseRoute {
  constructor(_app: Express, _router: Router) {
    super(_app, _router);
  }

  public async routes() {
    logger.info('Registering user routes');

    await this.urlpaths();
    this.app.use(ApplicationConstants.BASE_API_PATH, this.router);
  }

  public async urlpaths() {
    this.router.post(
      '/create-company',
      validateToken,
      [check('name', 'name cannot be empty.').not().isEmpty()],
      isAdmin,
      createCompanySanitize,
      validatePayload,
      createCompany
    );
    this.router.get('/companies', validateToken, getAllCompanies);
    this.router.get(
      '/company/:companyId',
      validateToken,
      companyIdSanitize,
      validatePayload,
      getCompanyById
    );
    this.router.patch(
      '/company/:companyId',
      validateToken,
      isAdmin,
      companyIdSanitize,
      validatePayload,
      updateCompanyById
    );
    this.router.delete(
      '/company/:companyId',
      validateToken,
      isAdmin,
      companyIdSanitize,
      validatePayload,
      deleteCompanyById
    );
  }
}
