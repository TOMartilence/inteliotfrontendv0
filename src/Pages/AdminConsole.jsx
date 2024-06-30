import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import ProjectCards from "../Components/ProjectCards"
import { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import axios from 'axios';
import eventImage from "../Images/events.jpeg"
import galleryImage from "../Images/Gallery.jpeg"
import memberImage from "../Images/People.jpeg"
import projectsImage from "../Images/Projects.png"

function AdminConsole() {
  const [passkey,setPasskey] = useState("");
  const [count,setCount] = useState(0)
  const [addAdminForm,setAddAdminForm]= useState("none");
  const [adminallow,setAdminallow] = useState(false)
  const [email,setEmail] = useState("");
  const [passwordOne,setPasswordOne] = useState("");
  const navigate = useNavigate();
  const handleNewAdmin = async(e)=>{
    e.preventDefault();
    try {
      setCount((prevCount) => prevCount + 1);
      if (count >= 0 && count % 2 === 0) {
        setAddAdminForm("");
      } else {
        setAddAdminForm("none");
      }
    } catch (error) {
      
    }
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/addAdmin`, { email, passwordOne });
      alert(response.data.message);
    } catch (error) {
      console.log("Error:", error); 
      alert("Error: " + error.response.data.message); 
    }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/checkSixteen`,{passkey})
    
      if(response.data.success){
        setAdminallow(true);
        setAddAdminForm("none")
        alert(response.data.message)
      }

      else{
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error);
      alert("Error")
    }
  }
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Unauthorized access. Please log in.');
    }
  }, [navigate]);

  return (
    <div style={{
      backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      position: "absolute",
      minHeight: "100vh",
      left: "0",
      width: "100%",
      overflow: "hidden",
    }}>
      {sessionStorage.getItem("token") ? (<Container style={{ marginTop: "200px" }}>
        <Row style={{ marginBottom: "50px" }}><h1 style={{ textAlign: "center", color: "white" }}>Admin Console <i onClick={handleNewAdmin} style={{ color: "white", fontSize: "40px", position: "absolute" }} className='fa fa-plus'></i> </h1></Row>
        {addAdminForm === "" ? (
          <Row>
            <form onSubmit={handleSubmit}>
              <Col style={{ width: "70%", margin: "auto" }}>
                <input type="text" className='form-group' onChange={(e) => { setPasskey(e.target.value) }} />
              </Col>
              <Col style={{ textAlign: "center" }}>
                <button type='submit' className='btn btn-outline-warning'>Submit</button>
              </Col>
            </form>
          </Row>
        ) : null}
        {adminallow ? (<Row>
  <form onSubmit={handleAddAdmin} style={{textAlign:"center"}}>
  <input type="email" style={{width:"50%", margin:"auto",padding:"8px",borderRadius:"9px",overflow:"hidden",border:"1px solid black"}}  onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter your admin email'/> <br /> <br />

  <input type="password" minLength={8} style={{width:"50%", margin:"auto",padding:"8px",borderRadius:"9px",overflow:"hidden",border:"1px solid black"}} onChange={(e)=>{setPasswordOne(e.target.value)}}  placeholder='Enter your admin password'/> <br />
  <button className='btn btn-danger' type='submit'>Add Admin</button>
  </form>
</Row>):(
  ""
)}

        <Row style={{textAlign:"center"}}>
          {/* Use responsive layout for ProjectCards */}
          <Col xs={12} sm={6} md={3} style={{marginBottom:"20px"}}>
            <ProjectCards title="Events" imagelink={eventImage} morelink="/events" person="Add or Delete Events on the go. Click manage or directly navigate to the events page."/>
          </Col>
          <Col xs={12} sm={6} md={3} style={{marginBottom:"20px"}}>
            <ProjectCards title="Projects" imagelink={projectsImage} morelink="/projects" person="Add or Delete Projects on the go. Click manage or directly navigate to the projects page." />
          </Col>
          <Col xs={12} sm={6} md={3} style={{marginBottom:"20px"}}>
            <ProjectCards title="Gallery" imagelink={galleryImage} morelink="/gallery" person="Add or Delete Photos on the go. Click manage or directly navigate to the gallery page."/>
          </Col>
          <Col xs={12} sm={6} md={3} style={{marginBottom:"20px"}}>
            <ProjectCards title="Members" imagelink={memberImage} morelink="/members" person="Add or Delete Members on the go. Click manage or directly navigate to the members page." />
          </Col>
        </Row>
      </Container>) : (
        <div style={{ marginTop: "200px", marginLeft: "200px" }}>
          <h1 style={{ color: "white" }}>Unauthorised Access</h1>
        </div>
      )}
    </div>
  );
}

export default AdminConsole;
