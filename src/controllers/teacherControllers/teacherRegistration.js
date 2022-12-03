import Student from "../../models/student.model.js";
import validator from "validator";
import CryptoJS from "crypto-js";
import nodemailer from 'nodemailer'
import Teacher from "../../models/teacher.model.js";

const userIdGenerator = () => {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < 7; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}
const data = userIdGenerator()

const registerTeacher = async (req, res) => {
    let { firstName, middleName, lastName, sex, email, loginID, password } = await req.body

    try {
        if (validator.isEmail(email)) {
            const exists = await Teacher.findOne({ email })

            if (exists) {
                res.status(400).json('email already exists')
            } else {
                const newTeacher = new Teacher({
                    firstName,
                    middleName,
                    lastName,
                    sex,
                    email,
                    loginID: CryptoJS.AES.encrypt(data, 'evidence').toString(),
                    password
                })
                const savedTeacher = await newTeacher.save()
                res.status(200).json(savedTeacher)
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

export default registerTeacher