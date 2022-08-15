import express, { Express } from "express";
let cors = require('cors');

export class CommonMiddleware {
    app: Express;

    constructor(_app: Express) {
        this.app = _app;
    }

    public async useJsonParser() {
        this.app.use(express.json())
    }

    public async useURLencoded() {
        this.app.use(express.urlencoded({
            extended: true
        }))
    }

    public async useCors() {
        this.app.use(cors());
    }
}