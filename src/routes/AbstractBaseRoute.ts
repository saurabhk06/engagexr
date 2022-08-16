import { Express, Router } from 'express';

/**
 * This is the base class for the routes.
 */
export abstract class AbstractBaseRoute {
  app: Express;
  router: Router;

  constructor(_app: Express, _router: Router) {
    this.app = _app;
    this.router = _router;
  }

  public abstract routes(): void;

  public abstract urlpaths(): void;
}
