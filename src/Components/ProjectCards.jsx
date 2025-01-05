import React, { useState } from "react";
import dummy from "../Images/you.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader";

function ProjectCards(props) {
  const [loader, setLoader] = useState("none");

  const handleDelete = async (id) => {
    try {
      setLoader("");
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/delete/${id}`);
      if (response.data.success) {
        alert(response.data.message);
        setLoader("none");
      }
    } catch (error) {}
    console.log("Card deleted:", props.title);
  };

  return (
    <div>
      <Loader display={loader} />
      <div className="card" style={{ maxWidth: "22rem", display: "flex", flexDirection: "column", height: "400px" }}>
        <div className="view overlay" style={{ flex: "1 1 auto", overflow: "hidden" }}>
          {props.imagelink ? (
            <img
              className="card-img-top"
              src={props.imagelink}
              alt="Card image cap"
              style={{
                height: "200px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          ) : (
            <img
              className="card-img-top"
              src={dummy}
              alt="Card image cap"
              style={{
                height: "200px",
                objectFit: "cover",
                width: "100%",
              }}
            />
          )}
        </div>

        <div className="card-body" style={{ flex: "1 1 auto", paddingBottom: "20px" }}>
          <h4 className="card-title">{props.title}</h4>
          <p className="card-text">
            {props.person} <br /> {props.rollnumber}
          </p>
          {sessionStorage.getItem("token") ? (
            <Link to={props.morelink} className="btn btn-outline-danger">
              Manage
            </Link>
          ) : (
            <a href={props.morelink} className="btn btn-primary waves-effect waves-light">
              Read more
            </a>
          )}

          <div style={{ marginTop: "20px" }}>
            {props.auth === "true" ? (
              <div>
                <span
                  style={{ marginLeft: "3px", cursor: "pointer" }}
                  className="fas fa-trash"
                  onClick={() => handleDelete(props.id)}
                ></span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCards;
