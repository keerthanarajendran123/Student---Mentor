import React, { useState } from 'react';
import { createStudent } from '../services/api'; // Import the API function for creating a student

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    name: '',
    batch: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newStudent = await createStudent(studentData);
      console.log('New Student:', newStudent);
      setMessage('Student created successfully!');
      // Additional logic for success
    } catch (error) {
      console.error('Error creating student:', error);
      setMessage(error.message || 'Failed to create student');
      // Additional logic for error handling
    }
  };

  return (
    <div>
      <h2>Student Form</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Batch:</label>
          <input
            type="text"
            name="batch"
            value={studentData.batch}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StudentForm;
