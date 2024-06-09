export interface DriverPostDto {
  name: string;
  surname: string;
  age?: number;
  drivingExperience: number;
  companyId: string;
  salary: number;
  cars: string[]
}

export interface DriverGetDto extends DriverPostDto{
  id: string;

}

