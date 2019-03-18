import {Request, Response} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Influencer, SocialType } from '../../models/Influencer.model';
import * as passport from 'passport'
import {Config} from '../../config';
import {Sequelize} from 'sequelize-typescript';
import {Occupation} from '../../models/Occupation.model';
import {Topic} from '../../models/Topic.model';
import {InfluencerTransformer} from './influencer.transformer';
import {Mailer} from '../../shared/mailer';
import {InfluencerTopic} from '../../models/InfluencerTopic.model';
import {BaseController} from '../../shared/base-controller';
import moment = require('moment');
var FB = require('fb');
FB.options({appId: Config.FACEBOOK_APP_ID, appSecret: Config.FACEBOOK_APP_SECRET});

export class InfluencerController extends BaseController {

    public async loginWithFacebook(req: Request, res: Response) {
        req.checkBody('accessToken').notEmpty().isString();
        req.checkBody('socialId').notEmpty().isString();
        const errors = req.validationErrors();
        if (!!errors) {
            this.sendError(res, 400, 'invalid_request', 'Your request is invalid', errors);
            return;
        }
        const {accessToken, socialId} = req.body;
        const influencer = await Influencer.findOne({where: {socialId}});
        if (!influencer) {
            const resp = await FB.api('me', { fields: 'email, name', access_token: accessToken })
            const newInfluencer = Influencer.build({name: resp.name, socialId: resp.id, socialType: SocialType.Facebook, email: resp.email});
            await newInfluencer.save();
            if (resp.email) {
                Mailer.shared.sendInfluencerSignupEmail(resp.email, resp.name);
            }
            res.send({influencer: InfluencerTransformer.transform(newInfluencer), token: ''});
        } else {
            //TODO: Generate token and return
            res.send({influencer: InfluencerTransformer.transform(influencer), token: ''});
        }
    }

    public async getList(req: Request, res: Response) {
        req.checkQuery('page').optional().isInt({min: 1});
        req.checkQuery('size').optional().isInt({min: 1});
        req.checkQuery('ageFrom').optional().isInt({min: 1});
        req.checkQuery('ageTo').optional().isInt({min: 1});
        req.checkQuery('search').optional().isString();
        const errors = req.validationErrors();
        if (!!errors) {
            this.sendError(res, 400, 'invalid_request', 'Your request is invalid', errors);
            return;
        }
        const page = parseInt(req.query.page || 1, 10);
        const size = parseInt(req.query.size || 10, 10);
        const search = req.query.search;
        const topics = await Topic.findAll({where: {name: {[Sequelize.Op.iLike]: '%' + search + '%'}}});

        const where: any = {};
        if (search) {
             where[Sequelize.Op.or] = {
                address: {
                    [Sequelize.Op.iLike]: '%' + search + '%',
                },
                civilId: {
                    [Sequelize.Op.iLike]: '%' + search + '%',
                },
                name: {
                    [Sequelize.Op.iLike]: '%' + search + '%',
                },
                socialType: {
                    [Sequelize.Op.iLike]: '%' + search + '%',
                },
                '$occupations.name$': {
                    [Sequelize.Op.iLike]: '%' + search + '%',
                },
            };
        }

        let { ageTo, ageFrom } = req.query;
        if (ageTo || ageFrom) {
            ageTo = parseInt(req.query.ageTo || 1000, 10);
            ageFrom = parseInt(req.query.ageFrom || 1, 10);
            const to = moment().add(-ageTo, 'years');
            const from = moment().add(-ageFrom, 'years');
            where.dob = {
                [Sequelize.Op.gte]: to,
                [Sequelize.Op.lt]: from,
            }
        }


        const query = await Influencer.findAndCountAll({
            where,
            limit: size,
            offset: (page - 1) * size,
            include: [{
                model: Topic,
                duplicating: false
            },
            {
                model: Occupation,
                duplicating: false
            }],
        });
        const total = query.count;
        const items = query.rows;
        const pageCount = Math.ceil(total / size);

        const result = {
            items: InfluencerTransformer.transformList(items),
            total,
            page: page,
            pages: pageCount,
        };
        res.status(200).json(result);
    }
};

