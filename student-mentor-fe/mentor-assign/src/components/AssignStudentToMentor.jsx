// AssignStudentsToMentor.js

import React, { useState, useEffect } from 'react';
import { getMentors, getUnassignedStudents, assignStudentsToMentor } from '../services/api';

const AssignStudentsToMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [message, setMessage] = useState('');
  const [unassignedStudents, setUnassignedStudents] = useState([]);

  useEffect(() => {
    fetchMentors();
    fetchUnassignedStudents();
  }, []);

  const fetchMentors = async () => {
    try {
      const mentorsList = await getMentors();
      setMentors(mentorsList);
    } catch (error) {
      console.error('Error fetching mentors:', error);
    }
  };

  const fetchUnassignedStudents = async () => {
    try {
      const studentsList = await getUnassignedStudents();
      setUnassignedStudents(studentsList);
    } catch (error) {
      console.error('Error fetching unassigned students:', error);
    }
  };

  const handleChange = (e) => {
    setSelectedMentor(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedStudents([...selectedStudents, value]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignStudentsToMentor(selectedMentor, selectedStudents);
      setMessage('Students assigned to mentor successfully');
    } catch (error) {
      console.error('Error assigning students:', error);
      setMessage('Failed to assign students');
    }
  };

  return (
    <div>
      <h2>Assign Students to Mentor</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Mentor:</label>
          <select value={selectedMentor} onChange={handleChange}>
            <option value="">Select Mentor</option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Students:</label>
          {unassignedStudents.map((student) => (
            <div key={student._id}>
              <input
                type="checkbox"
                id={student._id}
                name={student.name}
                value={student._id}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={student._id}>{student.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Assign Students</button>
      </form>
    </div>
  );
};

export default AssignStudentsToMentor;
