import Joi, { CustomHelpers } from "joi";

// validation using joi
// Custom Joi validator for capitalized first name
const capitalized = (value: string, helpers: CustomHelpers) => {
  const firstNameStr =
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  if (firstNameStr !== value) {
    return helpers.error("string.capitalized", { value });
  }
  return value;
};
// Schema for UserName
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .trim()
    .required()
    .custom(capitalized, "capitalize validation")
    .messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.max": "Name cannot be more than 20 characters",
      "any.custom": "{#value} is not in capitalized format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .max(20)
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/, "alpha")
    .messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.max": "Name cannot be more than 20 characters",
      "string.pattern.name": "{#value} is not valid",
    }),
});

// Schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().max(20).trim().required().messages({
    "string.base": "Father name must be a string",
    "string.empty": "Father name is required",
    "string.max": "Father name cannot be more than 20 characters",
  }),
  fatherOccupation: Joi.string().required().messages({
    "string.base": "Father occupation must be a string",
    "string.empty": "Father occupation is required",
  }),
  fatherContactNo: Joi.string().required().messages({
    "string.base": "Father contact number must be a string",
    "string.empty": "Father contact number is required",
  }),
  motherName: Joi.string().max(20).trim().required().messages({
    "string.base": "Mother name must be a string",
    "string.empty": "Mother name is required",
    "string.max": "Mother name cannot be more than 20 characters",
  }),
  motherOccupation: Joi.string().required().messages({
    "string.base": "Mother occupation must be a string",
    "string.empty": "Mother occupation is required",
  }),
  motherContactNo: Joi.string().required().messages({
    "string.base": "Mother contact number must be a string",
    "string.empty": "Mother contact number is required",
  }),
});

// Schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().max(20).trim().required().messages({
    "string.base": "Local guardian name must be a string",
    "string.empty": "Local guardian name is required",
    "string.max": "Local guardian name cannot be more than 20 characters",
  }),
  occupation: Joi.string().required().messages({
    "string.base": "Local guardian occupation must be a string",
    "string.empty": "Local guardian occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.base": "Local guardian contact number must be a string",
    "string.empty": "Local guardian contact number is required",
  }),
  address: Joi.string().required().messages({
    "string.base": "Local guardian address must be a string",
    "string.empty": "Local guardian address is required",
  }),
});

// Schema for Student
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "ID must be a string",
    "string.empty": "ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "object.base": "Name must be an object",
    "any.required": "Name is required",
  }),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "string.base": "Gender must be a string",
    "any.only":
      "The gender field can only be one of the following: 'male', 'female', or 'other'",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string().required().messages({
    "string.base": "Date of birth must be a string",
    "string.empty": "Date of birth is required",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "{#value} is not a valid email",
    "string.empty": "Email is required",
  }),
  contactNo: Joi.string().required().messages({
    "string.base": "Contact number must be a string",
    "string.empty": "Contact number is required",
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.base": "Emergency contact number must be a string",
    "string.empty": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "string.base": "Blood group must be a string",
      "any.only": "{#value} is not supported",
      "string.empty": "Blood group is required",
    }),
  presentAddress: Joi.string().required().messages({
    "string.base": "Present address must be a string",
    "string.empty": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.base": "Permanent address must be a string",
    "string.empty": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "object.base": "Guardian information must be an object",
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "object.base": "Local guardian information must be an object",
    "any.required": "Local guardian information is required",
  }),
  profileImage: Joi.string().required().messages({
    "string.base": "Profile image must be a string",
    "string.empty": "Profile image is required",
  }),
  isActive: Joi.string()
    .valid("active", "blocked")
    .default("active")
    .required()
    .messages({
      "string.base": "Active status must be a string",
      "any.only": 'Active status can only be "active" or "blocked"',
      "string.empty": "Active status is required",
    }),
});

export default studentValidationSchema;
