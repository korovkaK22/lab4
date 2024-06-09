import { DriverPostDto } from "../web/dto/driver";
import Driver from "../model/driver";
import { findCompanyById } from "./company";

export const createDriver = async (driverDto: DriverPostDto) => {
  await findCompanyById(driverDto.companyId);
  return new Driver({ ...driverDto }).save();
};
export const findDriversByCompany = async (companyId: string, from: number, size: number) => {
  await findCompanyById(companyId);
  return Driver.find({
    where: [{ companyId }],
  }
  ).skip(from).limit(size);
};
export const countDriversByCompanies = async (companyIds: string[]) => {
  const res = {} as any;
  for(const companyId of companyIds) {
    res[companyId] =await Driver.countDocuments({ companyId});
  }
  return res;
};
