import { Express, Router, Request, Response, NextFunction } from "express";
import { CompanyRoutes } from "../routes/CompanyRoutes";
import { EmployeeRoutes } from "../routes/EmployeeRoutes";
import { UserRoutes } from "../routes/UserRoutes";

export class InitializeRoutes {
  public static async registerAllRoutes(app: Express, router: Router) {
    let userRoutes = new UserRoutes(app, router);
    await userRoutes.routes();

    let companyRoutes = new CompanyRoutes(app, router);
    await companyRoutes.routes();

    let employeeRoutes = new EmployeeRoutes(app, router);
    await employeeRoutes.routes();
  }
}
