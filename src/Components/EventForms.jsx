import React, { useState } from 'react';
import axios from "axios"
import Loader from "../Components/Loader"

const EventForm = (props) => {
  const [loader,setLoader] = useState("none");

  const [formData, setFormData] = useState({
    eventTitle: '',
    poster: '',
    eventDate: '',
    description: '',
    registerLink: '',
    eventType: '',
    time: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader("");
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/addEvent`, {formData});
      console.log(response.data);
      setFormData({
        eventTitle: '',
        poster: '',
        eventDate: '',
        description: '',
        registerLink: '',
        eventType: '',
        time: ''
      });

      if(response.data.success){
        alert(response.data.message);
        setLoader("none")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="event-form-container" style={{display:props.formdisplay,position:"fixed",zIndex:"1000",opacity:0.97,top:"100px",left:"50%",transform:"translateX(-50%)", width: "90vw"}}>
      <h2>Event Registration Form</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label htmlFor="eventTitle" className="event-title-label">Event Title</label>
          <input type="text" id="eventTitle" name="eventTitle" value={formData.eventTitle} onChange={handleChange} required className="event-title-input" />
        </div>
        <div className="form-group">
          <label htmlFor="poster" className="poster-label">Poster</label>
          <input type="text" id="poster" name="poster" value={formData.poster} onChange={handleChange} required className="poster-input" />
        </div>
        <div className="form-group">
          <label htmlFor="eventDate" className="event-date-label">Event Date</label>
          <input type="date" id="eventDate" name="eventDate" value={formData.eventDate} onChange={handleChange} required className="event-date-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="description-label">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="description-input" />
        </div>
        <div className="form-group">
          <label htmlFor="registerLink" className="register-link-label">Register Link</label>
          <input type="url" id="registerLink" name="registerLink" value={formData.registerLink} onChange={handleChange} required className="register-link-input" />
        </div>
        <div className="form-group">
          <label htmlFor="eventType" className="event-type-label">Event Type</label>
          <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} required className="event-type-select">
            <option value="" className="event-type-option">Select Event Type</option>
            <option value="Conference" className="event-type-option">Conference</option>
            <option value="Workshop" className="event-type-option">Workshop</option>
            <option value="Seminar" className="event-type-option">Seminar</option>
            <option value="Webinar" className="event-type-option">Webinar</option>
            <option value="Hackathon" className="event-type-option">Hackathon</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="time" className="time-label">Time</label>
          <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required className="time-input" />
        </div>
        <button type="submit" className="event-submit-button">Submit</button>
        <Loader display={loader}/>
      </form>
    </div>
  );
};

export default EventForm;
