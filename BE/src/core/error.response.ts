export class HttpException extends Error {
  public status: number;
  public message: string;
  public rootError?: Error;
  public name: string;

  constructor(status: number, message: string, rootError?: Error) {
    super(`${message}\n${rootError?.stack}`);
    this.status = status;
    this.message = message;
    this.rootError = rootError;
    this.name = 'HttpException';
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string, rootError?: Error) {
    super(400, message, rootError);
    this.name = 'BadRequestException';
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string, rootError?: Error) {
    super(401, message, rootError);
    this.name = 'UnauthorizedException';
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string, rootError?: Error) {
    super(403, message, rootError);
    this.name = 'ForbiddenException';
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string, rootError?: Error) {
    super(404, message, rootError);
    this.name = 'NotFoundException';
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string, rootError?: Error) {
    super(500, message, rootError);
    this.name = 'InternalServerErrorException';
  }
}
