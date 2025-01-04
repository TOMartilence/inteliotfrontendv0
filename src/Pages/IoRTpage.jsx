import React, { useEffect, useState } from "react";
import StudentCard from "../Components/StudentCard";

function IoRTpage() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://inteliotbackendv0.onrender.com/api/iort');
        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }
        const data = await response.json();
        setStudents(data.reverse());
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div style={{marginTop:"100px",backgroundColor:"black"}} >
      <h1>IoRT Students</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="student-cards-container">
        {students.map((student) => (
          <StudentCard key={student._id} student={student} />
          
        ))}
      </div>
    </div>
  );
}

export default IoRTpage;
