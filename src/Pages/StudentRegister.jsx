import React, { useState } from 'react';
import axios from 'axios';

function StudentRegister() {
  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    year: '',
    dept: '',
    team: '',
    phoneNumber: '',
  });

  const [message, setMessage] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number field
    if (name === 'phone') {
      if (!/^\d{0,10}$/.test(value)) {
        return; // Prevent invalid input
      }
    }

    setFormData({ ...formData, [name]: value });

    // Reset phone error if corrected
    if (name === 'phoneNumber' && phoneError) {
      setPhoneError('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      setPhoneError('Phone number must be exactly 10 digits.');
      return;
    }

    try {
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/studentRegister`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error: Unable to register. Please try again later.');
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
          minHeight: '100vh',
          padding: '120px',
        }}
      >
        <div
          style={{
            maxWidth: '500px',
            margin: 'auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
          }}
        >
          <h2 style={{ marginTop: '20px' }}>IoRT Registration</h2>
          {message && <p style={{ color: 'green' }}>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Roll Number</label>
              <input
                type="text"
                name="roll"
                value={formData.roll}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="M.Tech">M.Tech</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Department</label>
              <select
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="" disabled>
                  Select dept
                </option>
                <option value="EEE">EEE</option>
                <option value="MEE">MEE</option>
                <option value="AEE">AEE</option>
                <option value="ELC">ELC</option>
                <option value="ARE">ARE</option>
                <option value="CSE">CSE</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Team</label>
              <select
                name="team"
                value={formData.team}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              >
                <option value="" disabled>
                  Select Team
                </option>
                <option value="Embedded Systems">Embedded Systems</option>
                <option value="Gazebo Simulation">Gazebo Simulation</option>
                <option value="Power Electronics System Design">
                  Power Electronics System Design
                </option>
                <option value="3D Modelling and Design">3D Modelling and Design</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  margin: '5px 0',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                }}
              />
              {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
            </div>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: isHovered ? '#4d4df7' : 'blue',
                color: 'white',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default StudentRegister;
