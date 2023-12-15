// services/api.js

import axios from 'axios';

const baseURL = 'http://localhost:8000'; // Your backend server URL

const api = axios.create({
  baseURL,
});

export const createMentor = async (mentorData) => {
  try {
    const response = await api.post('/mentor', mentorData);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const getStudentsForMentor = async (mentorId) => {
  try {
    const response = await api.get(`/mentor/${mentorId}/students`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getStudents = async () => {
  try {
    const response = await api.get('/students'); // Adjust endpoint to fetch students
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; 

export const getMentors = async () => {
  try {
    const response = await api.get('/mentors'); // Adjust endpoint to fetch mentors
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const assignStudentsToMentor = async (mentorId, studentIds) => {
  try {
    const response = await api.post(`/mentor/${mentorId}/assign-students`, { studentIds });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/student', studentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const assignMentorToStudent = async (studentId, mentorId) => {
  try {
    const response = await api.post(`/student/${studentId}/assign-mentor/${mentorId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUnassignedStudents = async () => {
  try {
    const response = await axios.get(`${baseURL}/unassigned-students`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const getPreviousMentorForStudent = async (studentId) => {
  try {
    const response = await api.get(`/student/${studentId}/previous-mentor`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}; 
 
export const getStudentById = async (studentId) => {
  try {
    // Implement logic to fetch student by ID from your backend
    const response = await fetch(`/api/students/${studentId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching student by ID');
  }
};

export const getMentorById = async (mentorId) => {
  try {
    // Make a fetch or axios request to get a mentor by ID from the server
    // Example:
    const response = await fetch(`/api/mentors/${mentorId}`);
    const mentor = await response.json();
    return mentor;
  } catch (error) {
    throw new Error('Error fetching mentor by ID');
  }
};

export const getStudentsWithoutMentor = async () => {
  try {
    // Make a fetch or axios request to get students without a mentor from the server
    // Example:
    const response = await fetch('/api/students/without-mentor');
    const students = await response.json();
    return students;
  } catch (error) {
    throw new Error('Error fetching students without a mentor');
  }
};



// Additional functions for other endpoints can be added similarly
