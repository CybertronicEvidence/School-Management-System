import Student from "../../models/student.model.js";
import validator from "validator";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer'

const userIdGenerator = () => {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < 7; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}
const data = userIdGenerator()


const registerStudent = async (req, res) => {

    let { firstName, middleName, lastName, admissionClass, academicYear, dateOfBirth, placeOfBirth, stateOfBirth, email, studentID } = await req.body

    try {
        if (validator.isEmail(email)) {
            const exists = await Student.findOne({ email })

            if (exists) {
                res.status(400).json('email already exists')
            } else {
                const newStudent = new Student({
                    firstName,
                    middleName,
                    lastName,
                    admissionClass,
                    academicYear,
                    dateOfBirth,
                    placeOfBirth,
                    stateOfBirth,
                    email,
                    studentID: CryptoJS.AES.encrypt(data, 'evidence').toString()
                })
                const savedStudent = await newStudent.save()
                res.status(200).json(savedStudent)
                // console.log(data);

                const transporter = nodemailer.createTransport({
                    service: "hotmail",
                    auth: {
                        user: "school-sms@outlook.com",
                        pass: "twef4877Son##"
                    }
                })

                const options = {
                    from: "school-sms@outlook.com",
                    to: `${email}`,
                    subject: `Good evening ${firstName}`,
                    text: `Your login ID is ${data}`
                }

                transporter.sendMail(options, (err, info) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    console.log("Sent: " + info.response)
                })
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const loginStudent = async (req, res) => {

    try {
        const student = await Student.findOne({ email: req.body.email })
        !student && res.status(401).json('Wrong Credentials')

        const hashedPassword = CryptoJS.AES.decrypt(student.studentID, 'evidence')
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        OriginalPassword !== req.body.studentID && res.status(401).json('Wrong credentials!')

        res.status(200).json(student)
    } catch (err) {
        res.status(500).json(err)
    }
}



export { registerStudent, loginStudent };