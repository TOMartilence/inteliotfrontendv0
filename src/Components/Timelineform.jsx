import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios"
function TimelineForm(props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post("https://inteliotbackendv0.onrender.com/api/addTimeline",{title,description,startDate,endDate,});
      alert(response.data.message)
    } catch (error) {
      alert("Couldnt process")
    }
  }
  return (
    <div style={{position:"absolute",left:"50%", width: "300px", height: "500px",zIndex:"5000", backgroundColor: "white", display: `${props.display}`, padding: "20px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",transform:"translateX(-50%)",top:"130px" ,color:"black"}}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", height: "80px" }} 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Start Date</label>
          <DatePicker 
            selected={startDate} 
            onChange={(date) => setStartDate(date)} 
            dateFormat="yyyy/MM/dd" 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>End Date</label>
          <DatePicker 
            selected={endDate} 
            onChange={(date) => setEndDate(date)} 
            dateFormat="yyyy/MM/dd" 
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} 
          />
        </div>
        <button type="submit" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "none", backgroundColor: "#3498db", color: "white", cursor: "pointer" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default TimelineForm;
