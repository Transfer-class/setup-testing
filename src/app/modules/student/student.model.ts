import { Schema, model, connect } from "mongoose";

// import validator from 'validator';

import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  // firstName: { type: String, required: [true, 'error message'] },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 character"],

    // making custom validator
    // we will always use normal function .because sometimes we may need to use ( this ) but in arrow function this doesn't work.so we will always write normal function for using this anytime

    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitalize format",
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    maxlength: [20, "Name can not be more than 20 character"],
    //  validation using validator library

    // warning: unfortunately the validator is not working here because of the eslint and some functional settings error

    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid', // is the value return false this will be error message
    // },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, "Father Name is required"],
    trim: true,
    maxlength: [20, "Father name can not be more than 20 character"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father contact number is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother Name is required"],
    trim: true,
    maxlength: [20, "Mother name can not be more than 20 character"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother contact number is required"],
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian name is required"],
    trim: true,
    maxlength: [20, "Local guardian name can not be more than 20 character"],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
  address: {
    type: String,
    required: [true, "Local guardian address is required"],
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, "ID is required"], unique: true },
  name: { type: userNameSchema, required: [true, "Name is required"] },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message:
        "The gender field can only be one of the following: 'male', 'female', or 'other'",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String, required: [true, "Date of birth is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,

    // warning: unfortunately the validator is not working here because of the eslint and some functional settings error

    // validate: {
    // validator: (value: string) => validator.isEmail(value),
    // message: '{VALUE} is not valid email type', // is the value return false this will be error message
    // },
  },
  contactNo: { type: String, required: [true, "Contact number is required"] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },

  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not supported", // {VALUE will be the user provided value}
    },
    required: [true, "Blood group is required"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  profileImage: { type: String, required: [true, "Profile image is required"] },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
    required: [true, "Active status is required"],
  },
});

// creating a model

// studentModel = model.<Student interface> ('Database collection Name',studentSchema to validate)
export const StudentModel = model<Student>("Student", studentSchema);
