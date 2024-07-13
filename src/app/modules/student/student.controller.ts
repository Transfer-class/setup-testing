import { Request, Response } from "express";
// import { Student } from "./student.interface";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    // receiving data form user request
    const studentData = req.body.student;

    // will call service function to send this data into Database
    const result = await StudentServices.createStudentIntoDB(studentData);
    // send response
    res.status(200).json({
      success: true,
      message: "Student has created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

// will export create student controller to use it form students.routes

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
