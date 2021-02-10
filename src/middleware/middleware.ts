import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "connect";
import { Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log('Request running');
        next();
    }

}