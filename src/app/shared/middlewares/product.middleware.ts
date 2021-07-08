import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ProductMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
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
    next();
}
