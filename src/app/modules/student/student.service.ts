import { error } from "console";
import { TStudent } from "./student.interface";
import { Student } from "./student.model";

// const createStudentIntoDB = async (studentData: Student) => {
//   // const result = await StudentModel.create(student); // built-in static method {because amra direct model class er create() method babohar korchi .static method hole instance toiri na korei amra direct class er model babohar korte pari  }

//   return result;
// };

// using instace method
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built-in static method

  // now we will make the static method using instance method
  // const studentInstance = new StudentModel(studentData); // changing name StudentModel to Student for naming confliction
  const studentInstance = new Student(studentData); // creating an instance
  // const result = await studentInstance.save(); // built in instance method

  if (await studentInstance.isUserExists(studentData.id)) {
    throw new Error("user already exist");
  }

  const result = await studentInstance.save(); // built in instance method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find(); // studentModel.find() to get all the data [it's mongoose style ]
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
