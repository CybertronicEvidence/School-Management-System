import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
// import states from "../states.api.js";


const statesArray = ['abia', 'adamawa', 'akwa-ibom']
// id
// firstname
// middlename
// lastname
// 2. Admission sought for Class
// 3. Academic year
// 4. Date of Birth
// 5. Place of Birth
// 6. State of Birth
// 7. Nationality
// 8. Religion
// 9. Gender
// 10. Residential Address
// 11. Mother Tongue
// 12. Blood group and lots more later on...

let validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

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
        }
    }, { timestamps: true }
)

const Student = mongoose.model('student', studentSchema)

export default Student;