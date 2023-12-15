import express from 'express';
import studentController from '../controllers/studentController.js';

const router = express.Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.post('/:studentId/assign-mentor/:mentorId', studentController.assignMentor);
router.get('/:studentId/previous-mentor', studentController.getPreviousMentor); 


export default router;
