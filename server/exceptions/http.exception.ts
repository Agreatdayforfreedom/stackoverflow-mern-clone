import { Response } from "express";

function HttpException(
  message: string,
  statusCode: number,
  response: Response
): void {
  const err: Error = new Error(message);
  response.status(statusCode).json({ err: err.message });
}

export default HttpException;
