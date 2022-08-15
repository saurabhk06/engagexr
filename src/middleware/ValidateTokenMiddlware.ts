import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { StatusConstants } from "../constants/StatusConstants";
import { Auth } from "../types/custom";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  // Check if Authorization header is set or not
  if (!token) {
    return res.status(StatusConstants.CODE_401).json({
      message: "Authorization header is missing",
    });
  }

  //  Remove Bearer if using Bearer Authorization mechanism
  if (token.toLowerCase().startsWith("bearer")) {
    token = token.split(" ")[1];
  }

  //validate the token using jsonwebtoken
  jwt.verify(token, process.env.SECRET as string, function (err: any, payload: any) {
    if (err) {
      return res.status(StatusConstants.CODE_403).json({
        error: "Please provide a valid token.",
      });
    }
    
    const decodedAuthInfo: Auth = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
    }
    req.auth = decodedAuthInfo;
  });

  next();
};