import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as any;

    let errorMessage = 'Validation failed';
    let validationErrors: string[] = [];

    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      if (Array.isArray(exceptionResponse.message)) {
        validationErrors = exceptionResponse.message;
        errorMessage = 'Validation failed on the following fields';
      } else if (typeof exceptionResponse.message === 'string') {
        errorMessage = exceptionResponse.message;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      error: 'Bad Request',
      message: errorMessage,
      validationErrors:
        validationErrors.length > 0 ? validationErrors : undefined,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    });
  }
}
