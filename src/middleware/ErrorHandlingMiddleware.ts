import { ErrorRequestHandler, Express } from 'express';
import { Response, Request } from 'express';
import { StatusConstants } from '../constants/StatusConstants';

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

  public async registerTokenErrorHandler() {
    this.app.use(this.tokeErrorHandler);
  }

  private tokeErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    if (
      err.name === 'UnauthorizedError' ||
      err.name === 'TokenExpiredError' ||
      err.name === 'JsonWebTokenError'
    ) {
      res.status(StatusConstants.CODE_401).json({
        error: 'Please provide a valid token. Try again!!!',
      });
    } else {
      next(err);
    }
  };
}
