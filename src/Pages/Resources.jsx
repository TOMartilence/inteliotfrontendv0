import React, { useEffect, useState } from 'react';
import axios from 'axios';
import problemStatements from "../Images/EventPosters/Problemstatement/problems.pdf"
import brochure from "../Images/EventPosters/Problemstatement/broch.pdf"
import format from "../Images/EventPosters/Problemstatement/format.pdf"

function Resources() {
  const [display, setDisplay] = useState('none');
  const [resource, setResource] = useState([]);

  const handleNewResource = async () => {
    try {
      setDisplay(display === 'none' ? '' : 'none');
    } catch (error) {
      console.error('Error handling new resource:', error);
    }
  };

  const handleOpenFile = async (fileName) => {
    try {
      // console.log("Requesting file:", fileName);
      // const response = await axios.post('https://inteliotbackendv0.onrender.com/api/findpdf', { fileName }, { responseType: 'blob' });

      // const blob = new Blob([response.data], { type: 'application/pdf' });
      // const url = URL.createObjectURL(blob);

      // window.open(url, '_blank');
      if(fileName ==="ESP2LIFE HACKATHON Official Problem Statements"){
        window.open(problemStatements)
      }
      else if (fileName === "Hackathon Report Format"){
        window.open(format)
      }
    } catch (error) {
      console.error('Error opening file:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', event.target.elements.title.value);
      formData.append('description', event.target.elements.description.value);
      formData.append('file', event.target.elements.file.files[0]);

      const response = await axios.post('https://inteliotbackendv0.onrender.com/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);

      onload();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const onload = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_backendbaseurl}/api/getResource`);
      setResource(response.data.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  useEffect(() => {
    onload();
  }, []);

  return (
    <div className="resources-container">
      {sessionStorage.getItem('token') && (
        <div className="add-resource-btn-container">
          <button
            onClick={handleNewResource}
            className="add-resource-btn"
          >
            <span className="fas fa-plus"></span>
          </button>
        </div>
      )}

      <div
        className="resource-form-container"
        style={{ display: display,zIndex:1000 }}
      >
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Title" className="form-control mb-3" />
          <textarea name="description" placeholder="Description" className="form-control mb-3" rows="3"></textarea>
          <input type="file" name="file" className="form-control mb-3" />
          <button type="submit" className="btn btn-success">Upload</button>
        </form>
      </div>

      <div className="resource-list row">
        {resource.map((item) => (
          <div className="resource-item col-md-4 mb-4" key={item.fileurl}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn btn-primary" onClick={() => handleOpenFile(item.title)}>Open PDF</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
