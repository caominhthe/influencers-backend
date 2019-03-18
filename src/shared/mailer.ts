import nodeMailer from 'nodemailer';
import {Config} from "../config";
import EmailTemplate from "email-templates";
import * as path from "path";

export class Mailer {

    static shared = new Mailer();

    private emailTemplate: EmailTemplate;

    constructor() {

        let smtpConfig = {
            host: Config.MAIL_HOST,
            port: Config.MAIL_PORT,
            secure: false,
            auth: {
                user: Config.MAIL_USER,
                pass: Config.MAIL_PASSWORD,
            }
        };

        // @ts-ignore
        const transport = nodeMailer.createTransport(smtpConfig);
        transport.verify()
            .then(() => console.log("Connection successful to Mail server"))
            .catch((err) => console.log("Connection to Mail server failed ",err));

        const templatesRoot = path.join(__dirname, "../", 'emails');
        this.emailTemplate = new EmailTemplate({
            message: {
                from: 'cmtspamacc@gmail.com'
            },
            views: {
                root: templatesRoot,
                extension: 'pug'
            },
            send: true,
            preview: false,
            transport: transport
        });
    }

    private sendEmail(template: string, emailTo: string, locals: any) {
        this.emailTemplate
            .send({
                template: template,
                message: {
                    to: emailTo
                },
                locals: locals
            })
            .catch();
    }

    sendInfluencerSignupEmail(emailTo: string, name: string): void {
        const template = 'influencer-signup';
        const locals = {
            name
        };
        this.sendEmail(template, emailTo, locals);
    }
}

