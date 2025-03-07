import { StatusCodes } from "./statusCodes";

export type ErrorInfo = {
  httpStatus: {
    code: number;
    name: keyof typeof StatusCodes;
  };
  code: string;
  message: string;
  data?: unknown;
};

export class AppError extends Error implements ErrorInfo {
  httpStatus: {
    code: number;
    name: keyof typeof StatusCodes;
  };
  code: string;
  message: string;
  data?: unknown;

  constructor(info: ErrorInfo) {
    super(info.message);
    this.httpStatus = info.httpStatus;
    this.code = info.code;
    this.message = info.message;
  }
}
