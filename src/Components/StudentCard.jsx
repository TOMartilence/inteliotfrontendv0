import React from "react";

function StudentCard({ student }) {
  return (
    <div className="card" style={{padding : "30px"}}>
      <h2>{student.name}</h2>
      <p><strong>Roll Number:</strong> {student.roll}</p>
      <p><strong>Year:</strong> {student.year}</p>
      <p><strong>Department:</strong> {student.dept}</p>
      <p><strong>Team:</strong> {student.team}</p>
      <p><strong>Phone:</strong> {student.phoneNumber}</p>
    </div>
  );
}

export default StudentCard;
