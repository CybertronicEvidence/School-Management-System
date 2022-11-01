import express from "express";
import { registerStudent, loginStudent } from "../controllers/studentControllers/studentRegistration.js";
const router = express.Router()


// student registration
router.post('/student-reg', registerStudent);
// student login
router.post('/student', loginStudent)

export default router;