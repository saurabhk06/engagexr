import { Express } from 'express';
import { CommonMiddleware } from '../middleware/CommonMiddleware';
import { ErrorHandlingMiddleware } from '../middleware/ErrorHandlingMiddleware';

export class InitializeMiddleware {
    public static async InitializeCommonMiddleware(app: Express) {
        let middleware = new CommonMiddleware(app);

        await middleware.useURLencoded();
        await middleware.useJsonParser();
        await middleware.useCors();
    }
    
    public static async InitializeErrorHandlingMiddleware(app :Express){
        let errorMiddleware = new ErrorHandlingMiddleware(app)

        await errorMiddleware.handle404Error()
        await errorMiddleware.registerTokenErrorHandler();
    }
}