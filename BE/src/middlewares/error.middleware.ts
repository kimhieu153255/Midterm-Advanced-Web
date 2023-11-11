import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@core/error.response';
import { logger } from '@utils/logger';
import { NODE_ENV } from '@/config';

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const rootError: Error = error.rootError || null;
    const name: string = error.name || 'HttpException';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Name:: ${name} Message:: ${message}, RootError:: ${rootError}`);
    res.status(status).json({
      name: name,
      code: status,
      stack: NODE_ENV === 'production' ? '🥞' : error.stack,
      message: message,
    });
  } catch (error) {
    next(error);
  }
};
