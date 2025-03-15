export class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class NotFoundError extends CustomError {
  constructor(msg = "Resources not found") {
    super(msg, 404);
  }
}
export class BadRequestError extends CustomError {
  constructor(msg = "Bad request") {
    super(msg, 400);
  }
}
