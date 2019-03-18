import express, {Response, NextFunction} from 'express';
import {VerifyErrors} from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import {Config} from "../config";
import bearerToken from 'express-bearer-token';
var Strategy = require('passport-facebook').Strategy;
import {Strategy as FacebookStrategy} from 'passport-facebook';
import { Influencer } from "../models/Influencer.model";

export class PassportMiddleware {

    public static setupPassport(passport: any) {
        passport.use('facebookInfluencer', new FacebookStrategy({
            clientID: Config.FACEBOOK_APP_ID,
            clientSecret: Config.FACEBOOK_APP_SECRET,
            callbackURL: "http://localhost:4000/influencer/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
            async (accessToken, refreshToken, profile, cb) => {
                const influencer = await Influencer.findOrCreate({ where: {socialId: profile.id }});
                return cb(influencer);
            }
        ));
    }
}
