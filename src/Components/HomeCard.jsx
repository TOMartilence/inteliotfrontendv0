import React from "react";
import { Row, Container } from "react-bootstrap";
import axios from "axios";

function HomeCard(props) {
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `https://inteliotbackendv0.onrender.com/api/deleteHomeCard/${id}`
      );
      alert(response.data.message);
    } catch (error) {}
  };
 return (
    <div>
      <Container
        className="homeCard"
        style={{
          background: props.bgcol,
          color: props.col,
          borderRadius: "9px",
          padding: "25px",
          boxShadow: "5px 5px 55px #121212",
          textAlign: props.align,
          marginBottom: "50px",
          border: "1px solid blue",
          overflow: "hidden",
        }}
      >
        {sessionStorage.getItem("token") ? (
          <div>
            <Row>
              <h3>
                {props.title}{" "}
                <span style={{ fontSize: "14px", marginLeft: "10px" }}>
                  {props.date} {props.time} IST
                </span>{" "}
                <button
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "none",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    handleDelete(props.id);
                  }}
                >
                  <span
                    className="fas fa-trash"
                    style={{ fontSize: "20px" }}
                  ></span>
                </button>
              </h3>
            </Row>
            <Row>
              <p style={{ wordWrap: "break-word" }}>{props.description} </p>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <h3>
                {props.title}{" "}
                <span style={{ fontSize: "14px", marginLeft: "10px" }}>
                  <br />
                  Posted : <span className="fas fa-table"></span> {props.date}{" "}
                  <span
                    style={{ marginLeft: "15px" }}
                    className="fas fa-clock"
                  ></span>{" "}
                  {props.time} IST
                </span>
              </h3>
            </Row>
            <Row>
              <p style={{ wordWrap: "break-word" }}>{props.description}</p>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default HomeCard;
