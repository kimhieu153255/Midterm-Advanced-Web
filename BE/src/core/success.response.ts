import { Response } from 'express';

enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  ALREADY_REPORTED = 208,
  IM_USED = 226,
}

enum ReasonPhrase {
  OK = 'OK',
  CREATED = 'Created',
  ACCEPTED = 'Accepted',
  NO_CONTENT = 'No Content',
  PARTIAL_CONTENT = 'Partial Content',
  MULTI_STATUS = 'Multi-Status',
  ALREADY_REPORTED = 'Already Reported',
  IM_USED = 'IM Used',
}

class SuccessResponse {
  public message: string;
  public status: StatusCode;
  public metadata: Record<string, any>;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonPhrase = ReasonPhrase.OK,
    metadata = {},
  }: {
    message?: string;
    statusCode?: StatusCode;
    reasonPhrase?: ReasonPhrase;
    metadata?: Record<string, any>;
  }) {
    this.message = !message ? reasonPhrase : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  public send(res: Response, headers: Record<string, any> = {}) {
    return res.status(this.status).set(headers).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: { message?: string; metadata?: Record<string, any> }) {
    super({ message, metadata });
  }
}

class Created extends SuccessResponse {
  public options: Record<string, any>;

  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonPhrase = ReasonPhrase.CREATED,
    metadata,
  }: {
    options?: Record<string, any>;
    message?: string;
    statusCode?: StatusCode;
    reasonPhrase?: ReasonPhrase;
    metadata?: Record<string, any>;
  }) {
    super({ message, statusCode, reasonPhrase, metadata });
    this.options = options;
  }
}

export { SuccessResponse, OK, Created };
