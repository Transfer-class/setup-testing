// import { Schema, model, connect } from "mongoose";

import { Model } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  email: string;
  profileImage?: string;
  isActive: "active" | "blocked";
};

// for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance

// // for custom instance method learning to find if a user exist in our DB or not
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>; // the Promise will return TStudent type data if student exist otherwise it will return null
// };

// Create a new Model type that knows about StudentMethods...
// export type StudentModel = Model<TStudent, {}, StudentMethods>;

// if the above line show any error the code below will be it's solution of '{ }'this empty object
// export type StudentModel = Model<
//   Student,
//   Record<string, never>,
//   StudentMethods
// >;
