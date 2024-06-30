import axios from "axios";
import React, { useState } from "react";
import Loader from "../Components/Loader"

const ProjectForm = (props) => {
  const [loader,setLoader] = useState("none");

  const [title, setTitle] = useState("");
  const [imagelink, setimagelink] = useState("");
  const [person, setPerson] = useState("");
  const [rollnumber, setRollnumber] = useState("");
  const [morelink, setmorelink] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader("");
      const response = await axios.post(
        `${process.env["REACT_APP_backendbaseurl"]}/api/addProject`,
        { title, imagelink, person, rollnumber, morelink }
      );
      if(response.data.success){
        alert(response.data.message)
        setLoader("none")
      }
    } catch (error) {
      alert("Error")
    }
  };

  return (
    <div
      className="projectform"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #38A2D7, #561139)",
        color: "white",
        position: "fixed",
        left: "5%",
        padding: "30px",
        width: "90%",
        top: "100px",
        margin: "auto",
        borderRadius: "5px",
        paddingTop: "20px",
        paddingBottom: "20px",
        zIndex: "1000",
        opacity: 0.98,
        display: props.display,
      }}
    >
      <form className="project-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imagelink">Image Link:</label>
          <input
            type="text"
            id="imagelink"
            value={imagelink}
            onChange={(e) => setimagelink(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="person">Person's Name:</label>
          <input
            type="text"
            id="person"
            value={person}
            onChange={(e) => setPerson(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollnumber">Roll Number:</label>
          <input
            type="text"
            id="rollnumber"
            value={rollnumber}
            onChange={(e) => setRollnumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="morelink">More Link:</label>
          <input
            type="text"
            id="morelink"
            value={morelink}
            onChange={(e) => setmorelink(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Loader display = {loader}/>
      </form>
    </div>
  );
};

export default ProjectForm;
