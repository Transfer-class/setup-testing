import express from "express";
import { StudentController } from "./student.controller";

const router = express.Router();

// this router will call createStudent controller function
router.post("/create-student", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:studentId", StudentController.getSingleStudent);
router.delete("/:studentId", StudentController.deleteSingleStudent);

export const StudentRoutes = router;
