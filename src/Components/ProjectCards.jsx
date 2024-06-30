import React, { useState } from "react";
import dummy from "../Images/you.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../Components/Loader"
function ProjectCards(props) {
  const [loader,setLoader] = useState("none");
  const handleDelete = async (id) => {
    try {
      setLoader("");
      const response = await axios.post(`${process.env["REACT_APP_backendbaseurl"]}/api/delete/${id}`);
      if(response.data.success){
        alert(response.data.message)
        setLoader("none")
      }
    } catch (error) {}
    console.log("Card deleted:", props.title);
  };

  return (
    <div>
      <Loader display={loader}/>
      <div className="card" style={{ maxWidth: "22rem" }}>
        <div className="view overlay">
          {props.imagelink ? (
            <img
              className="card-img-top"
              src={props.imagelink}
              alt="Card image cap"
            />
          ) : (
            <img className="card-img-top" src={dummy} alt="Card image cap" />
          )}
          <a href="#!">
            <div className="mask rgba-white-slight waves-effect waves-light"></div>
          </a>
        </div>

        <div className="card-body">
          <h4 className="card-title">{props.title}</h4>
          <p className="card-text">
            {props.person} <br /> {props.rollnumber}
          </p>
          {sessionStorage.getItem("token") ? (
            <Link to={props.morelink} className="btn btn-outline-danger">
              Manage
            </Link>
          ) : (
            <a
              href={props.morelink}
              className="btn btn-primary waves-effect waves-light"
            >
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
