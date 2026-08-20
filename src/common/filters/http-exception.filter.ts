import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      const exceptionResponse: any = exception.getResponse();
      message = Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message[0]
        : exceptionResponse.message || exception.message;
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      message: message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
