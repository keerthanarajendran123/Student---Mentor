import Mentor from '../models/Mentor.js';
import Student from '../models/Student.js';

const mentorController = {
  createMentor: async (req, res) => {
    try {
      const { name, email, course } = req.body;
      const newMentor = new Mentor({
        name,
        email,
        course
      });
      const mentor = await newMentor.save();
      res.status(201).json(mentor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStudentsForMentor: async (req, res) => {
    try {
      const { mentorId } = req.params;
      const mentor = await Mentor.findById(mentorId);
  
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
  
      const students = await Student.find({ mentor: mentorId });
      if (!students || students.length === 0) {
        return res.status(404).json({ message: 'No students found for this mentor' });
      }
  
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  assignStudentsToMentor: async (req, res) => {
    try {
      const { mentorId } = req.params;
      const { studentIds } = req.body;

      const mentor = await Mentor.findById(mentorId);
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }

      const unassignedStudents = await Student.find({
        $or: [
          { mentor: undefined },
          { mentor: { $ne: mentorId } }, 
        ],
      });

      const studentsToAssign = unassignedStudents.filter(student =>
        studentIds.includes(student._id.toString())
      );

      if (studentsToAssign.length !== studentIds.length) {
        return res.status(400).json({ message: 'Some students are already assigned to a mentor' });
      }

      mentor.students.push(...studentsToAssign.map(student => student._id));
      await mentor.save();

      for (const student of studentsToAssign) {
        student.mentor = mentorId;
        await student.save();
      }

      res.status(200).json({ message: 'Students assigned to mentor successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUnassignedStudents: async (req, res) => {
    try {
      const unassignedStudents = await Student.find({ mentor: undefined });
      res.status(200).json(unassignedStudents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getMentors: async (req, res) => {
    try {
      const mentors = await Mentor.find();
      res.status(200).json(mentors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};



export default mentorController;

