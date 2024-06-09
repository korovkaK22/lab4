import { driverCountApiCallValidationSchema, driverCreateApiCallValidationSchema } from "../../validation/driver";
import { Request, Response } from 'express';
import { returnErrorResponse } from "../../errorResponse";
import {
  countDriversByCompanies,
  createDriver as createDriverService,
  findDriversByCompany,
} from '../../../services/driver';
import driverMapper from '../../../mapper/driver';

export const createDriver = async (req: Request, resp: Response) => {
  let apiCall;

  try {
    apiCall = await driverCreateApiCallValidationSchema.validate(req.body, { abortEarly: false });
  } catch (validationError: any) {
    returnErrorResponse(resp, { status: 400, message: validationError.errors });
    return;
  }
  try {
    const entity = await createDriverService(apiCall.data);
    resp.status(201).json(driverMapper.toDto(entity));
    return;
  } catch (exception) {
    returnErrorResponse(resp, exception);
    return;
  }
};

export const getDriversByCompany = async (req: Request, resp: Response) => {
  const { companyId, from, size } = req.query;
  if (!companyId) {
    returnErrorResponse(resp, { message: 'Company id not provided', status: 400 });
    return;
  }
  try {
    const entities = await findDriversByCompany(companyId as string, Number((from as string)) || 0, Number((size as string)) || 5);
    resp.status(200).json(entities.map(el => driverMapper.toDto(el)));
    return;
  } catch (exception) {
    returnErrorResponse(resp, exception);
    return;
  }
};



export const countDrivers = async (req: Request, resp: Response) => {
  let apiCall;

  try {
    apiCall = await driverCountApiCallValidationSchema.validate(req.body, { abortEarly: false });
  } catch (validationError: any) {
    returnErrorResponse(resp, { status: 400, message: validationError.errors });
    return;
  }
  try {
    const entities = await countDriversByCompanies(apiCall.data.companyIds);
    resp.status(200).json(entities);
    return;
  } catch (exception) {
    returnErrorResponse(resp, exception);
    return;
  }
};

