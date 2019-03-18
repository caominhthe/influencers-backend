import { Express, Request, Response, NextFunction } from 'express';


export function wrapAsync(fn: any) {
    return function(req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next);
    };
}
