import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
// import states from "../states.api.js";


const statesArray = ['abia', 'adamawa', 'akwa-ibom']

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userIdGenerator = () => {
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomID = '';
    for (let i = 0; i < 7; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}
const data = userIdGenerator()

const studentSchema = new mongoose.Schema(
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
        admissionClass: {
            type: String,
            required: true
        },
        academicYear: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true,
            default: Date.now()
        },
        placeOfBirth: {
            type: String,
            required: true
        },
        stateOfBirth: {
            type: String,
            enum: statesArray,
            lowercase: true,
            required: true
        },
        email: {
            type: String,
            required: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            trim: true,
            lowercase: true,
            unique: true
        },
        studentID: {
            type: String,
            required: true
        }
    }, { timestamps: true }
)

const Student = mongoose.model('student', studentSchema)

export default Student;