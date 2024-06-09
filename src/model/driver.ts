import mongoose, { Document, Schema } from 'mongoose';

export interface IDriver extends Document {
  /** Name of the driver */
  name: string;
  /** Surname of the driver */
  surname: string;
  /** Age of the driver, might be not filled */
  age?: number;
  /** Driving experience in years */
  drivingExperience: number;
  /** Id of a company driver is working for */
  companyId: mongoose.Schema.Types.ObjectId;
  /** Salary of a driver in UAH */
  salary: number;
  /** Cars attached to this driver*/
  cars: string[]
  /** Creation date(fills automatically)*/
  createdAt?: Date;
  /** Updation date(fills automatically)*/
  updatedAt?: Date;
  /** Deletion date(fills when object is deleted) */
  deletedAt?: Date | null;
}

const driverSchema = new Schema({
  name: { default: 'Not specified', type: String },
  surname: { default: 'Not specified', type: String },
  age: { type: Number },
  drivingExperience: { required: true, default: 0, type: Number },
  salary: { required: true, default: 0, type: Number },
  cars: { required: true, default: [], type: [String] },

  companyId: {type: mongoose.Types.ObjectId, ref: 'Company'},

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date},

});


// soft delete filtering
driverSchema.pre('find', function() {
  this.where({ isDeleted: false });
});

driverSchema.pre('findOne', function() {
  this.where({ isDeleted: false });
});

driverSchema.pre('countDocuments', function() {
  this.where({ isDeleted: false });
});

const Driver = mongoose.model<IDriver>('Driver', driverSchema);

export default Driver;
