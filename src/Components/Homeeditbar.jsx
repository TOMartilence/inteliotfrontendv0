import axios from "axios";
import React, { useState } from "react";
import { SketchPicker } from 'react-color'; // Import color picker
import Select from 'react-select'; // Import dropdown for alignment

function SidebarComponent(props) {
  const [displayTitle, setDisplayTitle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alignment, setAlignment] = useState("");
  const [bgColor, setBgColor] = useState("#FFFFFF"); // Initial background color
  const [textColor, setTextColor] = useState("#000000"); // Initial text color
  const [homePageImage, setHomePageImage] = useState("");
  const [notification, setNotification] = useState("");
  const [scrollImage, setScrollImage] = useState("");

  const handleDisplayTitleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission for Display Title
  };

  const handleHomePageImageSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/changeHomePageImage`, { newImage: homePageImage });
      if (response.data.success) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      
    }
  };

  const handleNotificationSubmit = async (event) => {
    event.preventDefault();
    
    console.log(title, description, alignment, bgColor, textColor);
    try {
      const currentTime = new Date(); // Get current time
      const formattedDate = currentTime.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const formattedTime = currentTime.toLocaleTimeString(); // Format time as HH:MM:SS
  
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/addNotification`, {
        title,
        description,
        alignment,
        bgColor,
        textColor,
        submissionDate: formattedDate,
        submissionTime: formattedTime
      });
      if (response.data.success) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert('Internal server error');
    }
  };
  
  const handleScrollImageSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/addHomeImage`,{scrollImage})
      if(response.data.success){
        alert(response.data.message)
      }
      else{
        alert(response.data.message)
      }
    } catch (error) {
      
    }
  };

  return (
    <div
      className="custom-sidebar"
      style={{
        position: "fixed",
        color: "black",
        top: "210px",
        right: "30px",
        padding: "20px",
        display: props.display,
        borderRadius:"5px",
        boxShadow:"12px 12px 80px white",
        maxHeight: "50vh", // Set maximum height
        overflowY: "auto", // Enable overflow scrolling
        zIndex:"1000",
        width:"300px"
      }}
    >
      <div className="sidebar-header">
        <h3>Edit Home</h3>
      </div>
      <div className="sidebar-menu">
        <ul>
          
          <li onClick={() => setDisplayTitle("Add a Notification")}>
            Add a Notification
          </li>
          <li onClick={() => setDisplayTitle("Add a Scroll Image")}>
            Add an Event Poster
          </li>
        </ul>
      </div>
      <div className="sidebar-content">
        {displayTitle === "Change Home Page Image" && (
          <div className="form-section" id="home-page-image-section">
            <form onSubmit={handleHomePageImageSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                onChange={(e)=>{setHomePageImage(e.target.value)}}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {displayTitle === "Add a Notification" && (
          <div className="form-section" id="notification-section">
            <form onSubmit={handleNotificationSubmit}>
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label>Description</label>
              <textarea
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label>Alignment</label>
              <Select
                options={[
                  { value: 'left', label: 'Left' },
                  { value: 'center', label: 'Center' },
                  { value: 'right', label: 'Right' }
                ]}
                onChange={(selectedOption) => setAlignment(selectedOption.value)}
              />
              <label>Background Color</label>
              <SketchPicker
                color={bgColor}
                onChangeComplete={(color) => setBgColor(color.hex)}
              />
              <label>Text Color</label>
              <SketchPicker
                color={textColor}
                onChangeComplete={(color) => setTextColor(color.hex)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
        {displayTitle === "Add a Scroll Image" && (
          <div className="form-section" id="scroll-image-section">
            <form onSubmit={handleScrollImageSubmit}>
              <input
                type="text"
                placeholder="Image URL"
                value={scrollImage}
                onChange={(e) => setScrollImage(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarComponent;
