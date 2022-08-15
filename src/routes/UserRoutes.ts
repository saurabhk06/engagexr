import { Express, Router } from "express";
import { ApplicationConstants } from "../constants/ApplicationConstants";
import { signin, signup } from "../controllers/AuthController";
import { AbstractBaseRoute } from "./AbstractBaseRoute";

export class UserRoutes extends AbstractBaseRoute {
  constructor(_app: Express, _router: Router) {
    super(_app, _router);
  }

  public async routes() {
    await this.urlpaths();
    this.app.use(ApplicationConstants.BASE_API_PATH, this.router);
  }

  public async urlpaths() {
    this.router.post("/signup", signup);
    this.router.post("/signin", signin);
  }
}
