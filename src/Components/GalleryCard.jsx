import React from "react";
import dummy from "../Images/pg1bg.jpg";
import axios from "axios";
import cross from "../Images/cross.jpg"
import logo from "../Images/amrita logo.png"
function GalleryCard(props) {
  const rotateAngle = Math.floor(Math.random() * (10 - -10 + 1)) + -10;
  const handleDeleteGalleryCard = async (id) => {
    try {
      console.log(id);
      const response = await axios.post(
        `https://inteliotbackendv0.onrender.com/api/deletePicture/${id}`
      );
      alert(response.data.message);
    } catch (error) {}
  };
  return (
    <div className="first hero">
      <img
        className="hero-profile-img"
        src={props.image}
        alt=""
      />
      <div className="hero-description-bk"></div>
      <div className="hero-logo">
        {sessionStorage.getItem("token")?(<><img src={cross} alt="" onClick={()=>{handleDeleteGalleryCard(props.id)}} /></>):(<><img
          src={logo}
          alt=""
        /></>)}
      </div>
      <div className="hero-description">
        <p>{props.title}</p>
      </div>
      <div className="hero-date">
        <p>{props.date.substring(0,10)}</p>
      </div>
      <div className="hero-btn">
        <a href={props.morelink}>Learn More</a>
      </div>
    </div>

  );
}

export default GalleryCard;
