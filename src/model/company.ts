import mongoose, { Document, Schema } from 'mongoose';


export interface ICompany extends Document {
  /** Name of the company */
  name: string;
  /** Amount of employees registered in the company*/
  employeesAmount: number;
  /** Amount of cars registered in the company*/
  carsAmount: number;
  /** Year of registration*/
  registrationYear?: number;
  /** Phone number attached to the company*/
  contactNumber: string;
  /** Creation date(fills automatically)*/
  createdAt: Date;
  /** Updation date(fills automatically)*/
  updatedAt: Date;
  /** Deletion date(fills when object is deleted) */
  deletedAt?: Date | null;
}


const companySchema = new Schema({
  name: { type: String, required: true },
  employeesAmount: { type: Number, default: 0 },
  carsAmount: { type: Number, default: 0 },
  contactNumber: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },

},
);
companySchema.pre('find', function() {
  this.where({ deletedAt: { $ne: null } });
});

companySchema.pre('findOne', function() {
  this.where({ deletedAt: { $ne: null }});
});

const Company = mongoose.model<ICompany>('Company', companySchema);

export default Company;
