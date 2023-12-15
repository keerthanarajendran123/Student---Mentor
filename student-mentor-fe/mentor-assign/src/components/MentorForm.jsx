import React, { useState } from 'react';
import { createMentor } from '../services/api'; // Import the API function for creating a mentor

const MentorForm = () => {
  const [mentorData, setMentorData] = useState({
    name: '',
    email: '',
    course: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMentorData({
      ...mentorData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Submitting mentor data:', mentorData); // Add this line to log the mentor data being sent
        const newMentor = await createMentor(mentorData);
        console.log('New Mentor:', newMentor);
        setMessage('Mentor created successfully!');
        // Additional logic for success
    } catch (error) {
        console.error('Error creating mentor:', error);
        setMessage(error.message || 'Failed to create mentor');
        // Additional logic for error handling
    }
};

  return (
    <div>
      <h2>Mentor Form</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={mentorData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={mentorData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={mentorData.course}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MentorForm;
