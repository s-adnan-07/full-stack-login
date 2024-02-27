import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import mongoose from 'mongoose'
import { DUPLICATE_KEY_ERROR } from 'src/constants'

@Catch(mongoose.mongo.MongoServerError)
export class UserExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private readonly logger = new Logger(UserExceptionFilter.name)

  catch(exception: mongoose.mongo.MongoServerError, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()

    const errorCode = exception.code
    const statusCode =
      errorCode == DUPLICATE_KEY_ERROR
        ? HttpStatus.FORBIDDEN
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message =
      errorCode == DUPLICATE_KEY_ERROR
        ? 'User Already Exists !!!'
        : exception.message

    this.logger.error(exception.errmsg)

    const responseBody = {
      statusCode,
      message,
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode)
  }
}
