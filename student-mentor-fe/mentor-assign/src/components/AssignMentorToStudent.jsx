// AssignMentorToStudent.jsx

import React, { useState } from 'react';
import { assignMentorToStudent } from '../services/api'; // Import the API function

const AssignMentorToStudent = () => {
  const [studentId, setStudentId] = useState('');
  const [mentorId, setMentorId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setErrorMessage(''); // Clear any previous error message
      await assignMentorToStudent(studentId, mentorId); // Assign a mentor to the student
      // Add logic for success (e.g., show a success message)
      console.log('Mentor assigned to the student successfully');
    } catch (error) {
      console.error('Error assigning mentor to student:', error);
      setErrorMessage('Error assigning mentor to student'); // Set error message
      // Handle errors (e.g., display an error message)
    }
  };

  return (
    <div>
      <h2>Assign/Change Mentor for Student</h2>
      <div>
        <label>Enter Student ID:</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Student ID"
        />
      </div>
      <div>
        <label>Enter Mentor ID:</label>
        <input
          type="text"
          value={mentorId}
          onChange={(e) => setMentorId(e.target.value)}
          placeholder="Mentor ID"
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default AssignMentorToStudent;
