import * as yup from "yup";
import { DriverPostDto } from "../dto/driver";
import { AbstractCreateApiCallSchema, objectIdRegex } from "./common";

export const driverValidationSchema: yup.Schema<DriverPostDto> = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  age: yup.number().moreThan(16).optional(),
  drivingExperience: yup.number().positive().required(),
  companyId: yup.string().matches(objectIdRegex).required(),
  salary: yup.number().positive().required(),
  cars: yup.array().of(yup.string().required()).required(),
});


export const driverCreateApiCallValidationSchema: yup.Schema<SchemaForApiCallToCreateDriver> = yup.object({data: driverValidationSchema});
export const driverCountApiCallValidationSchema: yup.Schema<SchemaForApiCallToCountDrivers> = yup.object({data: yup.object({companyIds: yup.array().of(yup.string().matches(objectIdRegex).required()).required()})});

export type SchemaForApiCallToCreateDriver = AbstractCreateApiCallSchema<DriverPostDto>;
export interface SchemaForApiCallToCountDrivers {data:{companyIds: string[]}}