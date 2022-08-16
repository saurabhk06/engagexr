import express, { Express } from 'express';
import cors from 'cors';

/**
 * This class is used to initialize all the common middleware
 * use in the application.
 */
export class CommonMiddleware {
  app: Express;

  constructor(_app: Express) {
    this.app = _app;
  }

  public async useJsonParser() {
    this.app.use(express.json());
  }

  public async useURLencoded() {
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
  }

  public async useCors() {
    this.app.use(cors());
  }
}
