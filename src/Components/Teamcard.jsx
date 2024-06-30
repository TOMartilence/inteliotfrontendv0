import React from 'react';
import advisor from "../Images/Members/advisor.png"
import jaidev from "../Images/Members/jaidev.jpg"
import faccordinator from "../Images/Members/faccoordinator.jpg"
import deepak from "../Images/Members/deepak.jpeg"
import ananth from "../Images/Members/ananth.jpg"
import mangal from "../Images/Members/Mangal.jpg"
import thavensh from "../Images/Members/thavnesh.jpg"
import shyam from "../Images/Members/shyam.jpg"
import labcor from "../Images/Members/labcoordinator.jpg"
import tomj from "../Images/Members/tomj.jpeg"
import axios from "axios"
const ProfileCard = (props) => {
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `https://inteliotbackendv0.onrender.com/api/deleteMember/${id}`
      );
      alert(response.data.message);
    } catch (error) {}
  };
  let dp
  if (props.name === "Jaidev RS"){
    dp = jaidev;
  }
  if(props.name==="Pendyala Deepak Sai"){
    dp = deepak
  }
  else if(props.name === "Dr. Anbazhagan Mahadevan"){
    dp = faccordinator
  }

  else if(props.name === "Mangalasridharan Sankar Eswaran"){
    dp = mangal;
  }
  else if(props.name==="Ananthasivan"){
    dp = ananth
  }

  else if(props.name==="Shyam A"){
    dp = shyam
  }

  else if(props.name === "Mohan V"){
    dp = advisor
  }

  else if(props.name === "Thavanesh Kayden"){
    dp = thavensh
  }

  else if(props.name === "Thomas Jefferson"){
    dp = tomj
  }
  else if(props.name === "Mohan V"){
    dp = advisor
  }

  else if(props.name === "Dr. Anantha Narayanan V."){
    dp = labcor
  }
  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={dp} alt="profile" className="profile-image" />
        </div>
        <h2 className="profile-name">{props.name}</h2>
        <p className="profile-roll">{props.rollNumber}</p>
        <p className="profile-desc">{props.desc}</p>
        <a href={`mailto:${props.rollNumber.toLowerCase()}@cb.students.amrita.edu`} className="profile-email">Email</a>
        <div className="profile-links">
          <a href={props.linkedinlink} className="profile-link">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href={props.instagramlink} className="profile-link">
            <i className="fab fa-instagram"></i>
          </a>
          <a href={props.githublink} className="profile-link">
            <i className="fab fa-github"></i>
          </a>
          {sessionStorage.getItem("token") ? (<a onClick={()=>{handleDelete(props.id)}} className="profile-link">
            <i className="fas fa-trash"></i>
          </a>):(null)}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
