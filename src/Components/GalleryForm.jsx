import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { Row,Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom"
import Loader from "../Components/Loader"

const Galleryform = (props) => {
  const [loader,setLoader] = useState("none");
  const [category,setCategory] = useState("")
  const [description, setDescription] = useState("");
  const [imagelink, setImagelink] = useState("");
  const [morelink, setMorelink] = useState("");
  const [date, setdate] = useState(null);
  const [title,setTitle] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoader("");
      const response = await axios.post(
        `${process.env["REACT_APP_backendbaseurl"]}/api/addGallery`,
        {title ,description, imagelink, morelink,category, date }
      );
      if(response.data.success){
        alert(response.data.message)
        setLoader("none")
      }
    } catch (error) {
      alert("Error");
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
          <label htmlFor="description">Title:</label>
          <input
            type="text"
            id="description"
           
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <label htmlFor="morelink">More Link:</label>
          <input
            type="text"
            id="morelink"
            value={morelink}
            onChange={(e) => setMorelink(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="morelink">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            selected={date}
            onChange={(date) => setdate(date)}
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        <Row>
          <Col>
          <button type="submit" className="btn btn-primary">
          Submit
        </button></Col>

        <Col>
        <Link to="/videoform">
        <button  className="btn btn-warning">
          Video
          <span className="fas fa-plus" style={ { marginLeft : "10px"}}></span>
        </button>
        </Link>
        </Col>
        </Row>
        <Loader display = {loader}/>
      </form>
    </div>
  );
};

export default Galleryform;
