import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * This middleware is use to do the payload validation.
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const validatePayload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result);
  }
  next();
};
