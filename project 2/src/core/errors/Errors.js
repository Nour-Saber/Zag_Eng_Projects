export class customeError extends Error {
  constructor(msg, status_code) {
    super(msg);
    this.status_code = status_code;
  }
}
export class BadRequestError extends customeError {
  constructor(msg = "Bad request") {
    super(msg, 400);
  }
}
export class NotFoundError extends customeError {
  constructor(msg = "Resource not found ") {
    super(msg, 404);
  }
}
export class UnAuthorizedError extends customeError {
  constructor(msg = "UnAuthorized") {
    super(msg, 401);
  }
}
export class InternalServerError extends customeError {
  constructor(msg = "Server error") {
    super(msg, 500);
  }
}
