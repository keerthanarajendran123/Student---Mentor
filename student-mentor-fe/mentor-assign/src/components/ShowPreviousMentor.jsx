// ShowPreviousMentor.jsx

import React, { useState, useEffect } from 'react';
import { getPreviousMentorForStudent } from '../services/api'; // Import the API function for getting the previous mentor

const ShowPreviousMentor = ({ studentId }) => {
  const [previousMentor, setPreviousMentor] = useState(null);

  useEffect(() => {
    const fetchPreviousMentor = async () => {
      try {
        const response = await getPreviousMentorForStudent(studentId); // Call the API function to get the previous mentor
        setPreviousMentor(response.previousMentor);
      } catch (error) {
        console.error('Error fetching previous mentor:', error);
        // Handle errors (e.g., display an error message)
      }
    };

    fetchPreviousMentor();
  }, [studentId]);

  return (
    <div>
      <h2>Show Previous Mentor for Student</h2>
      {previousMentor ? (
        <div>
          <p>Previous Mentor: {previousMentor.name}</p>
          {/* Display other details of the previous mentor if needed */}
        </div>
      ) : (
        <p>No previous mentor found for this student.</p>
      )}
    </div>
  );
};

export default ShowPreviousMentor;
