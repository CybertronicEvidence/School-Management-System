import Student from "../../models/student.model";

const registerStudent = async (req, res) => {
    const newStudent = new Student(req.body)

    try {
        const savedStudent = await newStudent.save()
        res.status(200).json(savedStudent)
    } catch (err) {
        res.status(500).json(err)
    }
}

export default registerStudent;