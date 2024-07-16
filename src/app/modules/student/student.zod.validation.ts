import { z } from "zod";

// Define zod schemas for nested structures

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: "First name is required" })
    .trim()
    .max(20, "Name cannot be more than 20 characters")
    .refine(
      (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() === value,
      {
        message: "First name must be in capitalize format",
      }
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty({ message: "Last name is required" })
    .trim()
    .max(20, "Name cannot be more than 20 characters")
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: "Last name must contain only alphabets",
    }),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty({ message: "Father Name is required" })
    .trim()
    .max(20, "Father name cannot be more than 20 characters"),
  fatherOccupation: z
    .string()
    .nonempty({ message: "Father occupation is required" }),
  fatherContactNo: z
    .string()
    .nonempty({ message: "Father contact number is required" }),
  motherName: z
    .string()
    .nonempty({ message: "Mother Name is required" })
    .trim()
    .max(20, "Mother name cannot be more than 20 characters"),
  motherOccupation: z
    .string()
    .nonempty({ message: "Mother occupation is required" }),
  motherContactNo: z
    .string()
    .nonempty({ message: "Mother contact number is required" }),
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Local guardian name is required" })
    .trim()
    .max(20, "Local guardian name cannot be more than 20 characters"),
  occupation: z
    .string()
    .nonempty({ message: "Local guardian occupation is required" }),
  contactNo: z
    .string()
    .nonempty({ message: "Local guardian contact number is required" }),
  address: z
    .string()
    .nonempty({ message: "Local guardian address is required" }),
});

// Student schema
const studentValidationSchema = z.object({
  id: z.string().nonempty({ message: "ID is required" }),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message:
        "The gender field can only be one of the following: 'male', 'female', or 'other'",
    }),
  }),
  dateOfBirth: z.string().nonempty({ message: "Date of birth is required" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  contactNo: z.string().nonempty({ message: "Contact number is required" }),
  emergencyContactNo: z
    .string()
    .nonempty({ message: "Emergency contact number is required" }),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
    errorMap: (value) => ({ message: `${value} is not supported` }),
  }),
  presentAddress: z
    .string()
    .nonempty({ message: "Present address is required" }),
  permanentAddress: z
    .string()
    .nonempty({ message: "Permanent address is required" }),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().nonempty({ message: "Profile image is required" }),
  isActive: z
    .enum(["active", "blocked"], {
      errorMap: () => ({ message: "Active status is required" }),
    })
    .default("active"),
});

export default studentValidationSchema;
