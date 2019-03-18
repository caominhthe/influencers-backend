import {Response} from "express";

export function sendErrorResponse(res: Response, code: number, error: string, errorMessage: string, errorsDetails?: object) {
    const body = {
        error,
        error_message: errorMessage,
        error_details: errorsDetails,
    };
    res.status(code).json(body).send();
}

export abstract class BaseController {
    protected sendError(res: Response, code: number, error: string, errorMessage: string, errorsDetails?: Object) {
        sendErrorResponse(res, code, error, errorMessage, errorsDetails);
    }
}

