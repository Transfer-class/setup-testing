import { Request, Response } from "express";
// import { Student } from "./student.interface";
import { StudentServices } from "./student.service";
import Joi, { CustomHelpers } from "joi";
// import studentValidationSchema from "./student.joi.validation";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // receiving data form user request
    const studentData = req.body.student;

    // validation using zod

    const zodParsedData = studentValidationSchema.parse(studentData);

    // validating using joi
    // const { value, error } = studentValidationSchema.validate(studentData);
    // console.log({ value }, { error });
    // here value is validated data.now we can store it into database
    // will call service function to send this data into Database
    // const result = await StudentServices.createStudentIntoDB(value);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    // send response
    res.status(200).json({
      success: true,
      message: "Student has created successfully",
      data: result,
    });

    // error using zod
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong",
    //     // error:error,  // to watch error and error details
    //     error: error.details, // to watch only error details
    //   });
    // }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are  retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const studentData = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student has retrieved successfully",
      data: studentData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const studentData = await StudentServices.deleteSingleStudentFromDB(
      studentId
    );
    console.log(studentData);
    res.status(200).json({
      success: true,
      message: "Student has deleted successfully",
      data: studentData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error,
    });
  }
};

// will export create student controller to use it form students.routes

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
