import { Express, Router } from 'express';
import { ApplicationConstants } from '../constants/ApplicationConstants';
import { signIn, signUp } from '../controllers/AuthController';
import { validatePayload } from '../middleware/PayloadValidationMiddleware';
import { logger } from '../utils/logger';
import { signinSanitize, signupSanitize } from '../utils/payloadSanitization';
import { AbstractBaseRoute } from './AbstractBaseRoute';

/**
 * This class register all the User routes.
 */
export class UserRoutes extends AbstractBaseRoute {
  constructor(_app: Express, _router: Router) {
    super(_app, _router);
  }

  public async routes() {
    logger.info('Registering user routes');

    await this.urlpaths();
    this.app.use(ApplicationConstants.BASE_API_PATH, this.router);
  }

  public async urlpaths() {
    this.router.post('/signup', signupSanitize, validatePayload, signUp);
    this.router.post('/signin', signinSanitize, validatePayload, signIn);
  }
}
