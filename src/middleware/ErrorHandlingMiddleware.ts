import { Express } from 'express';
import { Response, Request } from 'express';
import { StatusConstants } from '../constants/StatusConstants';

/**
 * This class is use to register the error handling middleware
 * like 404 Error midleware
 */
export class ErrorHandlingMiddleware {
  app: Express;

  constructor(_app: Express) {
    this.app = _app;
  }

  public async handle404Error() {
    this.app.use((req: Request, resp: Response) => {
      resp.status(StatusConstants.CODE_404).json({
        error: StatusConstants.CODE_404_MESSAGE,
      });
    });
  }
}
