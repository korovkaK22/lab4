import AbstractMapper from "./Mapper";
import {IDriver} from "../model/driver";
import { DriverGetDto } from "../web/dto/driver";

class DriverMapper implements AbstractMapper<IDriver, DriverGetDto>{
  toDto(entity: IDriver): DriverGetDto {
    const copy = {...entity, createdAt: undefined, deletedAt: undefined, updatedAt: undefined,
      companyId: entity.companyId.toString(), id: entity._id.toString(), _id: undefined};
    return (copy as DriverGetDto);
  }

}
export default new DriverMapper();