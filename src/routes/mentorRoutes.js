import express from 'express';
import mentorController from '../controllers/mentorController.js';

const router = express.Router();

router.post('/', mentorController.createMentor);
router.get('/:mentorId/students', mentorController.getStudentsForMentor);
router.post('/:mentorId/assign-students', mentorController.assignStudentsToMentor);
router.get('/unassigned-students', mentorController.getUnassignedStudents);
router.get('/', mentorController.getMentors); 




export default router;
