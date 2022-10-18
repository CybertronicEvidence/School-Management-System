import express from "express";
import registerStudent from "../controllers/studentControllers/studentRegistration";
const router = express.Router()


// student registration
router.post('/student-reg', registerStudent)

export default router