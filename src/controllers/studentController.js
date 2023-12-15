import Student from '../models/Student.js';
import Mentor from '../models/Mentor.js';

const studentController = {
  async createStudent(req, res) {
    try {
     const { name,batch } = req.body;
      const newStudent = new Student({
        name,
        batch,
      });
      const student = await newStudent.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async assignMentor(req, res) {
    try {
      const { studentId, mentorId } = req.params;
  
      const student = await Student.findById(studentId);
      const newMentor = await Mentor.findById(mentorId);
  
      if (!student || !newMentor) {
        return res.status(404).json({ message: 'Student or Mentor not found' });
      }
  
      const previousMentorId = student.mentor;
  
      // Store current mentor in previousMentors before reassignment
      if (student.mentor) {
        student.previousMentors.push(student.mentor);
      }
  
      // Update student's mentor
      student.mentor = mentorId;
      await student.save();
  
      // If there was a previous mentor, update their list of students
      if (previousMentorId) {
        const previousMentor = await Mentor.findById(previousMentorId);
        if (previousMentor) {
          previousMentor.students = previousMentor.students.filter(student =>
            student.toString() !== studentId
          );
          await previousMentor.save();
        }
      }
  
      // Update the new mentor's list of students
      newMentor.students = newMentor.students.filter(student =>
        student.toString() !== studentId
      );
      newMentor.students.push(studentId);
      await newMentor.save();
  
      res.status(200).json({ message: 'Mentor assigned successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStudents: async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },  
  
async getPreviousMentor(req, res) {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate('previousMentors');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch the most recent previous mentor
    const previousMentor = student.previousMentors.slice(-1)[0];

    res.status(200).json({ previousMentor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

};

export default studentController;
