import {NextFunction, Request, Response} from 'express';
import {sendErrorResponse} from '../shared/base-controller';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(err);
    }
    sendErrorResponse(res, 500, 'unexpected_error', 'An unexpected error happened');
}

