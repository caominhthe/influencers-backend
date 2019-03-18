// lib/app.ts
import express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {Config} from './config';
import {Sequelize} from 'sequelize-typescript';
import expressValidator from 'express-validator';
import {Influencer} from './models/Influencer.model';
import {Occupation} from './models/Occupation.model';
import {Topic} from './models/Topic.model';
import {development as dbConfig} from '../database/config.json';
import {InfluencerTopic} from './models/InfluencerTopic.model';
import {InfluencerOccupation} from './models/InfluencerOccupation.model';
import {InfluencerRoutes} from './controllers/influencer.route';
import {PassportMiddleware} from './middleware/passport.middleware';
import {Mailer} from './shared/mailer';
import cors from 'cors';
import {errorHandler} from './middleware/error.handler';
var passport = require('passport');

class App {

    public app: express.Application;
    public sequelize = new Sequelize(dbConfig);

    constructor() {
        this.app = express();
        this.config();
        this.routesSetup();
        Mailer.shared;
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.sequelize.addModels([Influencer, Occupation, Topic, InfluencerOccupation, InfluencerTopic]);
        this.app.use(cors({
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        }));
        // PassportMiddleware.setupPassport(passport);
        this.app.use(errorHandler);
    }

    private routesSetup() {
        InfluencerRoutes.routes(this.app, passport);
    }
}

export default new App().app;
