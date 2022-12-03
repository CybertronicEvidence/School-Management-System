import express from "express";
import { registerStudent, loginStudent } from "../controllers/studentControllers/studentRegistration.js";
import registerTeacher from "../controllers/teacherControllers/teacherRegistration.js";
const router = express.Router()


// student registration
router.post('/student-reg', registerStudent);
// student login
router.post('/student', loginStudent)
// teacher registration
router.post('/register-teacher', registerTeacher)

export default router;