import Student from "../../models/student.model.js";
import validator from "validator";

const registerStudent = async (req, res) => {

    let { firstName, middleName, lastName, admissionClass, academicYear, dateOfBirth, placeOfBirth, stateOfBirth, email } = await req.body

    try {
        if (validator.isEmail(email)) {
            const exists = await Student.findOne({ email })
            const url = 'https://nigerian-states-info.herokuapp.com/api/v1/states'
            // const stateError =
            //     await fetch(url)
            //         .then(response => response.json())
            //         .then(data => {
            //             data.data.map(element => element.Name);
            //         })
            // }

            if (exists) {
                res.status(400).json('email already exists')
            } else {
                const newStudent = new Student(req.body)
                const savedStudent = await newStudent.save()
                res.status(200).json(savedStudent)
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

const loginStudent = async (req, res) => {
    try {
        const student = await Student.findOne({
            email: req.body.email,
        })
        !student && res.status(401).json('Wrong Credentials')
        res.status(200).json(student)
    } catch (err) {
        res.status(500).json(err)
    }
}

export { registerStudent, loginStudent };