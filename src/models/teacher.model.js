import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const genderArr = ['male', 'female']

const teacherSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            default: uuidv4().split('-').join('')
        },
        firstName: {
            type: String,
            required: true
        },
        middleName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: true
        },
        sex: {
            type: String,
            enums: genderArr,
            required: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            trim: true,
            lowercase: true,
            unique: true
        },
        loginID: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false,
        }
    }, { timestamps: true }
)

const Teacher = mongoose.model('teacher', teacherSchema)

export default Teacher;