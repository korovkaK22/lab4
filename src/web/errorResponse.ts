import { Response } from "express";

export const returnErrorResponse = (response: Response, exception: any) => {
  const returnData = {
    message: exception.message || JSON.stringify(exception, Object.getOwnPropertyNames(exception)),
    status: exception.status||500,
    timestamp: exception.timestamp || new Date().toISOString(),
  };
  response.status(returnData.status).json(returnData);
};