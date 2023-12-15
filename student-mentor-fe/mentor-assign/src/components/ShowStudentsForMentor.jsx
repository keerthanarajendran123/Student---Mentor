// ShowStudentsForMentor.jsx

import React, { useState, useEffect } from 'react';
import { getStudentsForMentor } from '../services/api'; // Import the API function

const ShowStudentsForMentor = ({ mentorId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getStudentsForMentor(mentorId); // Fetch students for the mentor
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students for mentor:', error);
        // Handle errors (e.g., display an error message)
      }
    };

    fetchStudents();
  }, [mentorId]);

  return (
    <div>
      <h2>Show Students for Mentor</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ShowStudentsForMentor;
