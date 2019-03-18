import express from 'express';
import {InfluencerController} from './influencer.controller';
import {wrapAsync} from '../shared/wrap';

export class InfluencerRoutes {

    static routes(app: express.Application, passport: any): void {
        const controller = new InfluencerController();
        app.get('/admin/influencer', wrapAsync(controller.getList.bind(controller)));
        app.post('/influencer/facebook/login', wrapAsync(controller.loginWithFacebook.bind(controller)));
    }

}

