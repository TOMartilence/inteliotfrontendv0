import React, { useState } from "react";
import axios from "axios";
import Loader from "../Components/Loader";

const MemberForm = (props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [linkedinlink, setLinkedinLink] = useState("");
  const [instagramlink, setInstagramLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [imagelink, setImagelink] = useState("");
  const [position,setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState("none");
  const [rollNumber,setRollnumber] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader("");
      const response = await axios.post(
        `${process.env["REACT_APP_backendbaseurl"]}/api/addMember`,
        {
          name,
          desc,
          linkedinlink,
          instagramlink,
          githubLink,
          rollNumber,
          position,
          imagelink,
          category
        }
      );
      if (response.data.success) {
        alert(response.data.message);
        setLoader("none");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <div
      className="member-form"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        color: "#333",
        padding: "30px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        margin: "20px auto",
        maxWidth: "100vw",
        display: props.formDisplay,
        marginTop: "90px",
        position: "absolute",
        zIndex:"9999999",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description:</label>
          <input
            type="text"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedinlink">LinkedIn Link:</label>
          <input
            type="text"
            id="linkedinlink"
            value={linkedinlink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instagramlink">Instagram Link:</label>
          <input
            type="text"
            id="instagramlink"
            value={instagramlink}
            onChange={(e) => setInstagramLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number: </label>
          <input
            type="text"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollnumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="githubLink">GitHub Link:</label>
          <input
            type="text"
            id="githubLink"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagelink">Image Link:</label>
          <input
            type="text"
            id="imagelink"
            value={imagelink}
            onChange={(e) => setImagelink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" style={{fontWeight:"lighter"}}>Select Category</option>
            <option value="Faculty coordinator">Faculty Coordinator</option>
            <option value="Founder">Founder</option>
            <option value="Head">Head</option>
            <option value="Leads">Lead</option>
            <option value="Club Advisor">Club Advisor</option>
            <option value="IOT Core Team">IOT Core Team</option>
            <option value="AI Core Team">AIoT Core Team</option>
            <option value="Co-Heads">Co-Head</option>
            <option value="IoRT Core Team">IoRT Core Team</option>
            <option value="Tech support Team">Tech Support Team</option>
            <option value="Web Development Core">WebDev Core</option>
            <option value="Event Management Core Team">Event Management</option>

          </select>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <Loader display={loader} />
      </form>
    </div>
  );
};

export default MemberForm;
