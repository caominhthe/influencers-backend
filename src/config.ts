import * as dotenv from "dotenv";

dotenv.config();
export class Config {
    static APP_SECRET = process.env.SECRET;
    static BCRYPT_ROUND = process.env.BCRYPT_ROUND;
    static FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
    static FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
    static FACEBOOK_USER_FIELD = 'name, email';
    static MAIL_HOST = process.env.MAIL_HOST  || 'smtp.gmail.com';
    static MAIL_PORT = parseInt(process.env.MAIL_PORT || '587', 10);
    static MAIL_USER = process.env.MAIL_USER || 'cmtspamacc@gmail.com';
    static MAIL_PASSWORD = process.env.MAIL_PASSWORD || 'Sjlva.29';

}
