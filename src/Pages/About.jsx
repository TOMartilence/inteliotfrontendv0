import React from 'react';

function About() {
  return (
    <div className="about-container" style={{width:"100vw",minHeight:"100vh",backgroundImage:"linear-gradient(to right, #0f0c29, #302b63, #24243e)"}}>
      <h2>About Us</h2>
      <p>We are the Intel IoT Club, dedicated to exploring and advancing technologies in various fields.</p>

      <h3>Divisions</h3>
      <ul className="divisions-list">
        <li><strong>IoT:</strong> Focuses on Internet of Things technologies.</li>
        <li><strong>IoRT:</strong> Specializes in Robotics and Automation.</li>
        <li><strong>AIoT:</strong> Integrates Artificial Intelligence with IoT.</li>
        <li><strong>Event Management:</strong> Organizes and manages club events.</li>
        <li><strong>Tech Support:</strong> Provides services like website development and more.</li>
      </ul>

      <h3>Partnership in Projects (PiP)</h3>
      <p>We offer PiP (Partner in Project) where individuals and groups can approach us for assistance and collaboration on various projects.</p>
    </div>
  );
}

export default About;
