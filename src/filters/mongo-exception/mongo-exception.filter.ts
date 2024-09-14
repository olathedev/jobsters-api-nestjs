import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { CastError } from 'mongoose';

@Catch()
export class MongoExceptionFilter<T> implements ExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response
      .status(400)
      .json({
        statusCode: 400,
        message: `${request.params.id} is not a valid Id`,
        error: 'Bad Request'
      });
  }
}
