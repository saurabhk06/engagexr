import { Express, Router } from 'express';

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
