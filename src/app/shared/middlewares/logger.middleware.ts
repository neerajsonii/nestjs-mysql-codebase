import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // console.log('Its a class based logger middleware');
        // logger logic here
        next();
    }
}

// functional middleware must be used only when it doesn't have any dependency
export function functionalLogger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log('Its a function based logger middleware');
    next();
}
