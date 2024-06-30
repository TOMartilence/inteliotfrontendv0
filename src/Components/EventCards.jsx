import React, { useState } from "react";
import "../Styles/Events.css";
import axios from "axios";
function EventCards(props) {
  const [count, setCount] = useState(0);
  const [formdisplay, setFormdisplay] = useState("none");
  
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `https://inteliotbackendv0.onrender.com/api/deleteEvent/${id}`
      );
      alert(response.data.message);
    } catch (error) {}
  };
  return (
    <div>
      <div class="container py-4">
        <article class="postcard dark blue">
          <a class="postcard__img_link" href="#">
            <img class="postcard__img" src={props.poster} alt="Image Title" />
          </a>
          <div class="postcard__text">
            <h1 class="postcard__title blue">
              <a href="#">{props.eventTitle}</a>
            </h1>
            <div class="postcard__subtitle small">
              <time datetime="2020-05-25 12:00:00">
                <i class="fas fa-calendar-alt mr-2"></i> {props.eventDate}
              </time>
            </div>
            <div class="postcard__bar"></div>
            <div class="postcard__preview-txt">{props.description}</div>
            <ul class="postcard__tagbox">
              <li class="tag__item">
                <i class="fas fa-tag mr-2" style={{ marginRight: "3px" }}></i>
                {props.eventType}
              </li>
              <li class="tag__item">
                <i class="fas fa-clock mr-2" style={{ marginRight: "3px" }}></i>
                {props.time}
              </li>
              <li class="tag__item play blue">
                <a href={props.registerLink}>
                  <i class="fas fa-pen mr-2" style={{ marginRight: "3px" }}>
                    {" "}
                  </i>
                  Register
                </a>
              </li>
            </ul>
          </div>
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
                style={{ marginLeft: "3px", cursor: "pointer", zIndex: 100000 }}
                className="fas fa-trash"
                onClick={() => {
                  handleDelete(props.id);
                }}
              ></span>

             
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}

export default EventCards;
