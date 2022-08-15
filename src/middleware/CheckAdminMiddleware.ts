import { Request, Response, NextFunction } from "express";
import { ApplicationConstants } from "../constants/ApplicationConstants";
import { StatusConstants } from "../constants/StatusConstants";

/**
 * This middleware is used to check if the user is authorised with the ADMIN role.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  let isAuthorised = req.auth && req.auth?.role && req.auth.role === ApplicationConstants.ROLE_ADMIN;

  if (!isAuthorised) {
    return res.status(StatusConstants.CODE_403).json({
      error: "You have insufficient privileges. Access Denied!!! ",
    });
  }
  next();
};
