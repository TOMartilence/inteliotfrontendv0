import React, { useState } from "react";
import axios from "axios";
import "../Styles/Slider.css";
import Loader from "../Components/Loader";

function MovingCard(props) {
  const [loader, setLoader] = useState("none");

  const handleDelete = async (id) => {
    try {
      setLoader("");
      const response = await axios.post(
        `${process.env["REACT_APP_backendbaseurl"]}/api/deleteHomeImage/${id}`
      );
      if (response.data.success) {
        alert(response.data.message);
        setLoader("none");
      }
    } catch (error) {}
  };

  const data = props.data;
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  const handleMouseOver = () => {
    setIsAnimationPaused(true);
  };

  const handleMouseLeave = () => {
    setIsAnimationPaused(false);
  };

  return (
    <div
      className="image-slider"
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Loader display={loader} />

      <div className={`image-train ${isAnimationPaused ? "" : "animate"}`}>
        {data.map((item, index) => (
          <div key={index} style={{ display: "inline-block" }}>
            <img src={item.imagelink} alt={`Image ${index}`} />
            {sessionStorage.getItem("token") ? (
              <div
                style={{
                  display: "flex",
                  height: "10%",
                  marginTop: "20px",
                  flexAlign: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    marginLeft: "3px",
                    cursor: "pointer",
                    zIndex: 100000,
                  }}
                  className="fas fa-trash"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                ></span>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovingCard;
