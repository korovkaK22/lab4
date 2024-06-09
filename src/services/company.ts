import { ObjectId } from "mongodb";
import Company from "../model/company";

export const findCompanyById = async (id: ObjectId | string) => {
  const company = await Company.findById(id);
  if (!company) {
    throw { message: `Company with id ${id} does not exist`, status: 404 };
  }
  return company;
};
